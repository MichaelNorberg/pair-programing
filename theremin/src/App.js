import React, { Component } from 'react';
import './App.css';
import Mute from './Mute.js'
import WaveSelector from './WaveSelector.js'

class App extends Component {
  constructor() {
    super()
    this.state = {
      xAxis: 0,
      yAxis: 0,
      waveform: "sine",
      mute: false
    };
  };
  componentDidMount() { 
    this.props.oscillator.connect(this.props.gain);
    this.props.gain.connect(this.props.output);

    let initialFreq = 1000;
    let initialVol = 0.001;
    //oscillator
    this.props.oscillator.type = this.state.waveform
    this.props.oscillator.detune.value = 100;
    this.props.oscillator.frequency.value = initialFreq
    this.props.oscillator.start(0);
    //gain 
    this.props.gain.gain.value = initialVol
  }
  componentWillMount() {
    document.addEventListener('mousemove', this.playTheremin);
  }
  playTheremin = (e) => {
    let xAxis = this.state.xAxis; 
    let yAxis = this.state.xAxis;
    xAxis = (e) ? e.pageX : e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
    yAxis = (e) ? e.pageY : e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop); 
    this.props.oscillator.frequency.value = (xAxis/this.props.width) * this.props.maxFreq
    this.props.gain.gain.value =(yAxis/this.props.height) * this.props.maxVol
    let volume = this.props.gain.gain.value
    let freq = this.props.oscillator.frequency.value

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
      canvasCtx.fillStyle = 'rgb(' + 100+(i*10) + ',' + Math.floor((this.props.gain.gain.value/this.props.maxVol)*255) + ',' + Math.floor((this.props.oscillator.frequency.value/this.props.maxFreq)*255) + ')';
      canvasCtx.arc(rX+random(0,50),rY+random(0,50),rC/2+i,(Math.PI/180)*0,(Math.PI/180)*360,false);
      canvasCtx.fill();
      canvasCtx.closePath();     
    } 
    /* let context = this.canvas.getContext('2d') */
    canvasCtx.clearRect(0,0,100,100);
    canvasCtx.fillStyle = `rgb(${e.clientX%255}, 0, ${e.clientY%255})`
    canvasCtx.fillRect(0,0,100,100)   
  }
  mute = () => {
    console.log('in mute func')
    if (this.state.mute) {
      this.props.gain.disconnect(this.props.output);
    }
    else {
      this.props.gain.connect(this.props.output);
    }  
  }
  changeMuteState = () => {
    this.setState({
      mute: !this.state.mute,
    }, () => this.mute())
  }
  changeWaveform = (e) => {
    this.setState({
      waveform: e.target.value,
    },() => {this.props.oscillator.type = this.state.waveform})

  }
  render() {
    let thereminStyle = {
      height: "100vh",
    }
    return (
      <div style={thereminStyle}>
      <canvas id="canvas"></canvas>
        <Mute changeMuteState={this.changeMuteState}/>
        <WaveSelector changeWaveform={this.changeWaveform}/>
        
      </div>
    );
  }
}

export default App;
