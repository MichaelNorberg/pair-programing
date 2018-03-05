import React, { Component } from 'react';

class WaveSelector extends React.Component {
    render() {
        return (
            <div>
                
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Select Waveform</label>
                        <select onChange={(e) => {this.props.changeWaveform(e)}} 
                                className="form-control" 
                                id="exampleFormControlSelect1">
                            <option>sine</option>
                            <option>square</option>
                            <option>triangle</option>
                            <option>sawtooth</option>
                        </select>
                    </div>
                
            </div>
        )
    }
}

export default WaveSelector;