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
      mute: false,
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
    //reverb

  }
  componentWillMount() {
    document.addEventListener('mousemove', this.playTheremin);
  }
  playTheremin = (e) => {
    console.log('you hit it')
    let xAxis = this.state.xAxis; 
    let yAxis = this.state.xAxis;
    xAxis = (e) ? e.pageX : e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
    yAxis = (e) ? e.pageY : e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop); 
    this.props.oscillator.frequency.value = (xAxis/this.props.width) * this.props.maxFreq
    this.props.gain.gain.value =(yAxis/this.props.height) * this.props.maxVol
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
        <Mute changeMuteState={this.changeMuteState}/>
        <WaveSelector changeWaveform={this.changeWaveform}/>
        
      </div>
    );
  }
}

export default App;
