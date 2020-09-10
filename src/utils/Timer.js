import React from 'react';
import styled from 'styled-components';

const TimeShow = styled.div`
    width: 20em;
    height: 3.5em;
    background-color: #ddd;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    padding: .4em;
`

const TextHolder = styled.h4`
    margin: .2em;
`

const process = date => {
    return date.slice(0, 16).replaceAll('-', '.').replaceAll('T', ' ')
}

const Timer = ({time}) => {
    return (
        <TimeShow>
            <TextHolder>Ostatnia aktualizacja:</TextHolder>
            <TextHolder>{process(time)}</TextHolder>
        </TimeShow>
    )
}

export default Timer;