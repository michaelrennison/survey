import React, { Component } from 'react';

class Survey extends Component {
    state = {
        title: 'Calculate your personal score',
        description: 'Next we have a short 2-3 minute survey covering Diet, Home, Travel and Other that will let us calculate your personal carbon footprint',
        buttonText: 'Take the survey'
    }
    render() {
        return (
            <React.Fragment>
                <h1>{this.state.title}</h1>
                <p>{this.state.description}</p>
                <button className="btn btn-primary">{this.state.buttonText}</button>
            </React.Fragment>
        );
    }
}

export default Survey;