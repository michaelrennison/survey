import React, {Component} from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import axios from "axios";
import CategoryModel from "../models/category";
class CategoryProgress extends Component {
    state = {
        progress: 0,
        color: null
    }

    constructor(props) {
        super(props);
        this.state.color = this.props.category.themeColour
        if(this.props.category.id === 1) {
            console.log(this.state.color)
        }
    }
    updateState = (value) => {
        //use the value to set state here
        this.setState({progress: value});
    }
    render() {
        return (
            <div className={'col text-center ' + (this.props.category.id == this.props.active ? 'active' : '')}>
                {this.checkActive()}
                <ProgressBar now={this.state.progress} />
                {this.props.category.name}
            </div>
        );
    }

    checkActive() {
        if(this.props.category.id == this.props.active) {
            let styleHtml = `.active .progress-bar { background-color: ${this.state.color} }`;
            return <style dangerouslySetInnerHTML={{__html: styleHtml}} />
        }
    }
}

export default CategoryProgress