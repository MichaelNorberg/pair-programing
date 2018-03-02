import React, { Component } from 'react';
import './App.css';



class App extends Component {
  constructor() {
    super()
    this.state = {
      xAxis: 0,
      yAxis: 0,
    };
  };
  componentDidMount() { 
    this.props.oscillator.connect(this.props.gain);
    this.props.gain.connect(this.props.output)

    let initialFreq = 1000;
    let initialVol = 0.1;
    //oscillator
    this.props.oscillator.detune.value = 100;
    this.props.oscillator.frequency.value = initialFreq
    this.props.oscillator.start(0); 
    this.props.gain.gain.value = initialVol
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
  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default App;
