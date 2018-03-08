import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


let AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = new AudioContext();
let oscillator = audioCtx.createOscillator();
let gain = audioCtx.createGain();
let output = audioCtx.destination;
let width = window.innerWidth;
let height = window.innerHeight;
let maxFreq = 3000;
let maxVol = 0.02;

ReactDOM.render(<App oscillator={oscillator} 
                     gain={gain} 
                     output={output} 
                     width={width} 
                     height={height}
                     maxFreq={maxFreq}
                     maxVol={maxVol}/>, document.getElementById('root'));
registerServiceWorker();
