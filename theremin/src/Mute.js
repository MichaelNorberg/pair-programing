import React from 'react';

class Mute extends React.Component {
    render() {
        let navbar= {
            backgroundColor: 'black',
            fontFamily: "monospace",
            textAlign: "center"
          };

        return (
            <div style={navbar}>
                <button onClick={this.props.changeMuteState}>mute</button>
            </div>
        );
    };
};

export default Mute;