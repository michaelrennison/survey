import React, {Component} from "react";

const config = require('../config.json');

class ThankYou extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <img src="./assets/image.png" />
                <h5 className="text-center font-weight-bold">All done!</h5>
                <p className="text-center">Thank you for completing the survey</p>
            </React.Fragment>
        );
    }
}

export default ThankYou