import React, {Component} from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import axios from "axios";
import CategoryModel from "../models/category";

const config = require('../config.json');

class Result extends Component {
    state = {
        loaded: false,
        category: null
    }

    constructor(props) {
        super(props);
        console.log(this.props);
        this.state.id = this.props.match.params.categoryId
        this.getCategory()
    }

    render() {
        return (
            <React.Fragment>
                {this.checkForCategory()}
            </React.Fragment>
        );
    }

    getCategory() {
        axios.get(`${config.server}/category/${this.state.id}`).then((resp) => {
            console.log(resp);
            const category = new CategoryModel(
                resp.data.name,
                resp.data.theme_colour,
                resp.data.id
            );

            this.setState({category: category, loaded: true});
        });
    }

    checkForCategory() {
        if(this.state.loaded) {
            let styleHtml = `.progress-bar { background-color: ${this.state.category.themeColour} }`;
            return  <React.Fragment>
                <div className="text-center text-white pb-1" style={{ background: this.state.category.themeColour }}>
                    <h1 className="mb-0 pt-3">{this.state.category.name}</h1>
                    <p>Your score</p>
                </div>
                <div className="p-5 text-center">
                    <div className="mb-3">
                        <span className="font-weight-bold">UK national average: </span>
                        <span>2.2 Tons of CO2 produced per year</span>
                    </div>
                    <div className="mb-3">
                        <style dangerouslySetInnerHTML={{__html: styleHtml}} />

                        <ProgressBar now={50} />
                    </div>
                    <div className="mb-3">
                        <span className="font-weight-bold">You're using 3.2 Tons of CO2 / year</span>
                    </div>
                </div>
                <div className="text-center p-5">
                    <p className="font-weight-bold">Lets see how you do in the <span>Home</span> category...</p>
                    <button className="btn-primary btn btn-block">Continue</button>
                </div>
            </React.Fragment>;
        } else {
            return <p>Loading...</p>
        }
    }
}

export default Result