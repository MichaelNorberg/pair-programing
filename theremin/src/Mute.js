import React, { Component } from 'react';

class Mute extends React.Component {
    render() {
        return (
            <div>
                <button onClick={this.props.changeMuteState}>mute</button>
            </div>
        )
    }
}

export default Mute;