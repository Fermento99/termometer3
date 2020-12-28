import React, { useState } from 'react';
import Room from './utils/Room';
import styled from 'styled-components';
import Graph from './utils/Graph';
import Timer from './utils/Timer';


const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`

const App = ({ result }) => {
  const { salon, pawel, michal, bathroom, bedroom, date } = result
  const [room, setRoom] = useState(null)
  return (
    <>
      <Container>
        <Timer time={date}></Timer>
      </Container>
      <Container>
        <Room temp={salon} roomname="Salon" onClick={() => setRoom("salon")} />
        <Room temp={pawel} roomname="Pawel" onClick={() => setRoom("pawel")} />
        <Room temp={michal} roomname="Michal" onClick={() => setRoom("michal")} />
        <Room temp={bedroom} roomname="Sypialnia" onClick={() => setRoom("bedroom")} />
        <Room temp={bathroom} roomname="Łazienka" onClick={() => setRoom("bathroom")} />
      </Container>
      <Container>
        <Graph room={room} />
      </Container>
    </>
  )
};

export default App;