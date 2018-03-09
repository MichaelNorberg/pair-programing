import React from 'react';

class WaveSelector extends React.Component {
    render() {
        let navbar= {
            backgroundColor: 'black',
            color: 'white',
            fontSize: 25,
            fontFamily: "monospace",
            textAlign: "center"
           };
        return (
            <div>
                <div style={navbar}class="form-group">
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
        );
    };
};

export default WaveSelector;