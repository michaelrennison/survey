import React, {Component} from "react";

class Answer extends Component {
    state = {}

    render() {
        return (
            <div className="col-6 p-1">
                <div onClick={this.toggleAnswer.bind(this)} className="card shadow text-center py-2 justify-content-center align-items-stretch" style={this.props.answer.selected ? { background: this.props.category.themeColour, color: 'white' } : {background: 'white'}} key={this.props.answer.id}>{ this.props.answer.title }</div>
            </div>
        );
    }

    toggleAnswer() {
        this.props.handler(this.props.answer.id, !this.props.answer.selected);
    }
}

export default Answer