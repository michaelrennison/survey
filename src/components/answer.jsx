import React, {Component} from "react";

class Answer extends Component {
    state = {}

    render() {
        if(this.props.answer.selected) {

        }
        return (
            <div className="card" style={this.props.answer.selected ? { background: 'red' } : {background: 'inherit'}} key={this.props.answer.id}>{ this.props.answer.title }</div>
        );
    }
}

export default Answer