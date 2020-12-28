import React, { useState, useEffect, useRef } from 'react';
import chart from 'chart.js'
import styled from 'styled-components'

const GraphContainer = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 40em;
  background-color: #ddd;
  padding: .5em;
`
const GraphButton = styled.button`
  margin: 0 .5em 1.5em .5em;
`

const draw = (obj, canv) => {
  let temp = []
  let date = []

  obj.forEach(element => {
    let t = Object.values(element)
    t[1] = t[1].slice(0, 16).replace('T', ' ')
    temp.push(t[0])
    date.push(t[1])
  });

  const myChartRef = canv.getContext("2d");
  new chart(myChartRef, {
    type: 'line',
    data: {
      labels: date,
      datasets: [{
        label: 'temperatura',
        data: temp,
        pointRadius: 0,
        borderWidth: 3,
        borderColor: '#333',
        backgroundColor: 'rgba(0,0,0,0)'
      }],

    },
    options: {
      events: ["click"],  
      legend: {
        display: false
      },
      backgroundColor: '#ddd',
      scales: {
        yAxes: [{
          ticks: {
            suggestedMin: 19,
            suggestedMax: 26
          }
        }],
        xAxes: [{
          type: "time",
          time: {
            unit: "hour",
          }
        }]
      }
    }
  })
}



const Graph = ({ room }) => {
  const [size, setSize] = useState(6);
  const ref = useRef(null)

  useEffect(() => {
    if(!room) return;
    fetch(`http://192.168.89.200:3001/temp/hist/${room}/${size}`)
      .then(res => res.json())
      .then(res => draw(res, ref.current))
  }, [size, room])

  if(!room) return null;
  return (
    <GraphContainer room={room}>
      <canvas ref={ref} />
      {
        [6, 12, 24, 48, 96].map(el => <GraphButton key={el} onClick={() => setSize(el)}>{el} godzin</GraphButton> )
      }
    </GraphContainer>
  )
};

export default Graph