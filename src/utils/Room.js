import React from 'react';
import styled from 'styled-components';

const BasicTemp = styled.div`
  width: 14em;
  height: 9em;
  margin: 1em;
  background-color: #ddd;
  display: flex;
  flex-direction: column;
  transition-duration: .3s;

  &:hover {
    transform: scale(1.1);
  }

  background: ${props => {
    let color = { first: "rgba(136,255,134,1)", second: "rgba(254,255,0,1)" }
    if (props.temp <= 19) color = { first: "rgba(134,255,193,1)", second: "rgba(0,159,255,1)" }
    else if (props.temp >= 22.5) color = { first: "rgba(255,241,134,1)", second: "rgba(255,192,0,1)" }
    
    return "linear-gradient(175deg," + color.first + " 10%, " + color.second + " 35%, rgba(224,224,224,1) 35%);"
  }};
`

const RoomName = styled.h3`
  margin: .6em 1.2em;
`

const RoomTempHolder = styled.span`
  width: 14em;
  height: 6em;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const Room = ({temp, roomname, onClick}) => {
  return (
    <BasicTemp temp={temp} onClick={onClick}>
      <RoomName>{roomname}</RoomName>
      <RoomTempHolder>
        <h1>{temp} <sup>o</sup>C</h1>
      </RoomTempHolder>
    </BasicTemp>
  )
}


export default Room;