import React, {Component} from "react";
import { getSiteOptions } from '../helpers/globals';

const config = require('../config.json');

class ThankYou extends Component {
    state = {
        title: '',
        description: ''
    }
    constructor(props) {
        super(props);
        getSiteOptions('thanks_title').then(value => {
            this.setState({title: value})
        });

        getSiteOptions('thanks_description').then(value => {
            this.setState({description: value})
        })
    }
    render() {
        return (
            <div className="p-5">
                <img className="mb-3" src="./assets/image.png" />
                <h5 className="text-center font-weight-bold">{this.state.title}</h5>
                <p className="text-center">{this.state.description}</p>
            </div>
        );
    }
}

export default ThankYou