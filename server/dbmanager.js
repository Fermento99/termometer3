const mysql = require("mysql");
const utils = require("./utils")

const connect = () => {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pocohaslo',
    database: 'temperature'
  })
}


function now(callback) {
  let connection = connect();
  connection.query('select * from history order by date desc limit 1', (err, res, fields) => {
    if (err) console.log(err);

    callback(res[0])
  })

  connection.end();
}

function temp(room, limit, callback) {

  switch (room) {
    case 'bedroom':
    case 'bathroom':
    case 'salon':
    case 'pawel':
    case 'michal': break;
    default: room = 'salon';
  }
  
  switch (limit) {
    case '96':
    case '6':
    case '12':
    case '24':
    case '48': break;
    default: limit = 6;
  }
  limit = utils.timeHoursBefore(limit)
  let connection = connect();
  connection.query(`select ${room}, date from history where date > ${limit} order by date`, (err, res) => {
    if (err) console.log(err)
    
    callback(res)
  })
  
  connection.end()
}

function addTemp(temp, response) {
  let connection = connect()
  connection.query(`INSERT INTO history values ('${temp.date}', ${temp.bedroom}, ${temp.bathroom}, ${temp.salon}, ${temp.pawel}, ${temp.michal})`, 
      (err, res) => {
    if (err) {
      console.log(err)
      response.send(400)
    }
    else {
      console.log('ok')
      response.send(200)
    }
  })
  connection.end()
}

module.exports.now = now;
module.exports.temp = temp; 
module.exports.add = addTemp;