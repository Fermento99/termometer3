import logging
import socket
import datetime
import requests
datetime_object = datetime.datetime.now()
print(datetime_object.weekday())

HOST='192.168.89.231'
PORT=7083

logging.basicConfig(level=logging.DEBUG)
_LOGGER = logging.getLogger(__name__)

 
def main():
    s=socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((HOST, PORT))

    temp = dict()
    temp['bathroom'] = read_temp(s, 25)
    temp['michal'] = read_temp(s, 27)
    temp['pawel'] = read_temp(s, 29)
    temp['salon'] = read_temp(s, 31)
    temp['bedroom'] = read_temp(s, 33)
    temp['date'] = datetime.datetime.now()
    requests.post('http://localhost:3001/newtemp', params=temp)


def read_temp(socket, zones):
    _LOGGER.debug("Send query temp: %s", zones)
    data = generate_query(b'\x7d' + zones.to_bytes(1,'big'))
    send_data(socket, data)
    data = read_data(socket)
    print_hex(data)
    temp = int.from_bytes(data[2:4], byteorder='big', signed=False)/2 - 55
    _LOGGER.debug("Read temp: %s -> %s oC", zones, temp)
    return temp
    
def generate_query(command):
    """Add header, checksum and footer to command data."""
    data = bytearray(command)
    c = checksum(data)
    data.append(c >> 8)
    data.append(c & 0xFF)
    data.replace(b'\xFE', b'\xFE\xF0')

    data = bytearray.fromhex("FEFE") + data + bytearray.fromhex("FE0D")
    return data
    
def checksum(command):
    """Function to calculate checksum as per Satel manual."""
    crc = 0x147A
    for b in command:
        # rotate (crc 1 bit left)
        crc = ((crc << 1) & 0xFFFF) | (crc & 0x8000) >> 15
        crc = crc ^ 0xFFFF
        crc = (crc + (crc >> 8) + b) & 0xFFFF
    return crc


def print_hex(data):
    """Debugging method to print out frames in hex."""
    hex_msg = ""
    for c in data:
        hex_msg += "\\x" + format(c, "02x")
    _LOGGER.debug(hex_msg)

def send_data(socket, data):
        _LOGGER.debug("-- Sending data --")
        print_hex(data)
        _LOGGER.debug("Sending %d bytes...", len(data))
        socket.send(data)

def read_data(socket):
        data=socket.recv(20)
        _LOGGER.debug("-- Received data --")
        print_hex(data)
        _LOGGER.debug("Received %d bytes...", len(data))
        return verify_and_strip(data)
        
def verify_and_strip(resp):
    """Verify checksum and strip header and footer of received frame."""
    if resp[0:2] != b'\xFE\xFE':
        _LOGGER.error("Houston, we got problem:")
        print_hex(resp)
        raise Exception("Wrong header - got %X%X" % (resp[0], resp[1]))
    if resp[-2:] != b'\xFE\x0D':
        raise Exception("Wrong footer - got %X%X" % (resp[-2], resp[-1]))
    output = resp[2:-2].replace(b'\xFE\xF0', b'\xFE')

    c = checksum(bytearray(output[0:-2]))

    if (256 * output[-2:-1][0] + output[-1:][0]) != c:
        raise Exception("Wrong checksum - got %d expected %d" % (
            (256 * output[-2:-1][0] + output[-1:][0]), c))

    return output[0:-2]
    
if __name__ == '__main__':
    main() 
