import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


fetch(`http://192.168.89.20:3001/temp/now`)
    .then((result => {
        return result.json()
    }))
    .then(result => { ReactDOM.render(<App result={result} />, document.getElementById('root')) })
