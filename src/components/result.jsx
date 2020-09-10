import React, {Component} from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import axios from "axios";
import CategoryModel from "../models/category";
import {Link} from "react-router-dom";

const config = require('../config.json');

class Result extends Component {
    state = {
        loaded: false,
        category: null,
        nextCategory: null,
        linkTarget: null,
        endSurvey: false
    }

    constructor(props) {
        super(props);
        this.state.id = this.props.categoryId
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
            const category = new CategoryModel(
                resp.data.name,
                resp.data.theme_colour,
                resp.data.id,
                resp.data.average
            );

            this.setState({category: category, loaded: true});
            this.getNextCategory();
        });
    }

    checkForCategory() {
        if(this.state.loaded) {
            let styleHtml = `.progress-bar { background-color: ${this.state.category.themeColour} }`;
            return  <React.Fragment>
                <div className="text-center text-white pb-1" style={{ background: this.state.category.themeColour }}>
                    <h1 className="mb-0 pt-4 font-weight-bold large-title">{this.state.category.name}</h1>
                    <p className="mb-1">Your score</p>
                </div>
                <div className="p-5 text-center">
                    <div className="mb-3">
                        <span className="font-weight-bold">UK national average: </span>
                        <span>{this.state.category.average} Tons of CO2 produced per year</span>
                    </div>
                    <div className="mb-3 result-bar shadow p-2">
                        <style dangerouslySetInnerHTML={{__html: styleHtml}} />
                        <ProgressBar  now={this.getUserAgainstAverage()} />
                    </div>
                    <div className="mb-3">
                        <span className="font-weight-bold">You're using { this.props.total } Tons of CO2 / year</span>
                    </div>
                </div>
                {this.displayNextCategory()}
            </React.Fragment>;
        } else {
            return <p>Loading...</p>
        }
    }

    /**
     * Set the average as 50%, 100% will be double the average and then check where the user
     * fits within that scale, if the user is over
     */
    getUserAgainstAverage() {
        const max = this.state.category.average * 2;
        return (this.props.total / max) * 100;
    }

    getNextCategory() {
        axios.get(`${config.server}/next-category/${this.state.id}`).then((resp) => {
            if(resp.data) {
                const category = new CategoryModel(
                    resp.data.name,
                    resp.data.theme_colour,
                    resp.data.id,
                    resp.data.average
                );
                this.setState({nextCategory: category});
            } else {
                this.setState({endSurvey: true});
            }
        });
    }

    displayNextCategory() {
        if(this.state.endSurvey) {
            return <div className="text-center p-5">
                <Link to='../thanks' className="btn-primary btn btn-block">Complete</Link>
            </div>;
        }
        else if(this.state.nextCategory !== null) {
            const linkTarget = {
                pathname: `../categories/${this.state.nextCategory.id}`,
                key: this.uuid(),
                state: {
                    applied: true
                }
            };
            return <div className="text-center p-5 bg-white next-cat">
                <p className="font-weight-bold">Lets see how you do in the <span className="font-weight-bold font-italic" style={{ color: this.state.nextCategory.themeColour}}>{this.state.nextCategory.name}</span> category...</p>
                <Link onClick={this.handleChange} to={linkTarget} className="btn-primary btn btn-block">Continue</Link>
            </div>;
        } else {
            return <p>Loading...</p>
        }
    }

    handleChange = () => {
        this.props.handler(this.state.nextCategory.id)
    }
    uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

export default Result