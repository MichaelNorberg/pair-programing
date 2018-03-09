import React, { Component } from 'react';
import './App.css';
import Mute from './Mute.js'
import WaveSelector from './WaveSelector.js'




class App extends Component {
  constructor() {
    super()
    this.state = {
      waveform: "sine",
      mute: false
    };
  };
  componentDidMount() { 
    //connecting audio nodes
    this.props.oscillator.connect(this.props.gain);
    this.props.gain.connect(this.props.output);
    // setting initial values for when the page loads
    let initialFreq = 1000;
    let initialVol = 0.001;
    //oscillator
    this.props.oscillator.type = this.state.waveform;
    this.props.oscillator.detune.value = 100;
    this.props.oscillator.frequency.value = initialFreq;
    this.props.oscillator.start(0);
    //gain 
    this.props.gain.gain.value = initialVol;
  }
  componentWillMount() {
    document.addEventListener('mousemove', this.playTheremin);
  }
  playTheremin = (e) => {
    //setting up sound
    let xAxis = (e) ? e.pageX : e.clientX + (document.documentElement.scrollLeft ? 
      document.documentElement.scrollLeft : document.body.scrollLeft);
    let yAxis = (e) ? e.pageY : e.clientY + (document.documentElement.scrollTop ? 
      document.documentElement.scrollTop : document.body.scrollTop); 
    this.props.oscillator.frequency.value = (xAxis/this.props.width) * this.props.maxFreq;
    this.props.gain.gain.value =(yAxis/this.props.height) * this.props.maxVol;

    //setting up bubbles
    function random(number1,number2) {
      var randomNo = number1 + (Math.floor(Math.random() * (number2 - number1)) + 1);
      return randomNo;
    } 
    
    let canvas = document.querySelector('#canvas');
    canvas.width = this.props.width;
    canvas.height = this.props.height; 
    
    var canvasCtx = canvas.getContext('2d');

    let rX = xAxis;
    let rY = yAxis;
    let rC = Math.floor((this.props.gain.gain.value/this.props.maxVol)*30);
      
    canvasCtx.globalAlpha = 0.2;
      
    for(let i = 1;i <= 15;i = i+2) {
      canvasCtx.beginPath();
      canvasCtx.fillStyle = 'rgb(' + 100+(i*10) + ',' + Math.floor((this.props.gain.gain.value/this.props.maxVol)*255) + ',' 
      + Math.floor((this.props.oscillator.frequency.value/this.props.maxFreq)*255) + ')';
      canvasCtx.arc(rX+random(0,50),rY+random(0,50),rC/2+i,(Math.PI/180)*0,(Math.PI/180)*360,false);
      canvasCtx.fill();
      canvasCtx.closePath();     
    };
    //setting up background
    canvasCtx.clearRect(0,0,100,100);
    canvasCtx.fillStyle = `rgb(${e.clientX%255}, ${(e.clientX%255 * e.clientY%255)%255}, ${e.clientY%255})`;
    canvasCtx.fillRect(0,0,1680,862)   ;
  };
  mute = () => {
    console.log('in mute func')
    if (this.state.mute) {
      this.props.gain.disconnect(this.props.output);
    }
    else {
      this.props.gain.connect(this.props.output);
    }; 
  };
  changeMuteState = () => {
    this.setState({
      mute: !this.state.mute,
    }, () => this.mute())
  };
  changeWaveform = (e) => {
    this.setState({
      waveform: e.target.value,
    },() => {this.props.oscillator.type = this.state.waveform})
  };
  render() {
    let thereminStyle = {
      height: "100vh",
    };

    return (
      <div style={thereminStyle}>
      <WaveSelector changeWaveform={this.changeWaveform}/> 
      <Mute changeMuteState={this.changeMuteState}/>
        <canvas id="canvas"></canvas>
       

      </div>
    );
  };
};

export default App;
