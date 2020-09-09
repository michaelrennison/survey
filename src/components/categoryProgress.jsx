import React, {Component} from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import axios from "axios";
import CategoryModel from "../models/category";
class CategoryProgress extends Component {
    state = {
        progress: 0,
        color: null,
        id: null
    }

    constructor(props) {
        super(props);
        this.state.color = this.props.category.themeColour;
        this.state.progress = this.props.category.progress;
        this.state.id = this.props.category.id;
    }
    updateState = (value) => {
        //use the value to set state here
        this.setState({progress: value});
    }
    render() {
        let styleHtml = `.colour-bar-${this.state.id} .progress-bar { background-color: ${this.state.color} }`;

        return (
            <div className={'col p-1 text-center colour-bar-' + this.state.id}>
                <style dangerouslySetInnerHTML={{__html: styleHtml}} />
                <ProgressBar now={this.state.progress} />
                <span className="category-title" style={ this.props.category.id == this.props.active ? {color: this.props.category.themeColour} : {} }>{this.props.category.name}</span>
            </div>
        );
    }
}

export default CategoryProgress