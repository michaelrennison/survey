import React, { Component } from 'react';
import CategoryModel from "../models/category";
import axios from 'axios';
import { Router, Link } from "react-router-dom";

const config = require('../config.json');
class Survey extends Component {
    state = {
        title: 'Calculate your personal score',
        description: 'Next we have a short 2-3 minute survey covering Diet, Home, Travel and Other that will let us calculate your personal carbon footprint',
        buttonText: 'Take the survey',
        categories: []
    }

    constructor(props) {
        super(props);
        // call the function to retrieve the categories from the backend
        this.getCategories();
    }
    render() {
        return (
            <div className="p-5">
                <img src="./assets/image.png" />
                <h5 className="text-center font-weight-bold">{this.state.title}</h5>
                <p className="text-center">{this.state.description}</p>
                {this.hasCategories()}
            </div>
        );
    }

    getCategories() {
        // Get the categories from the server
        axios.get(`${config.server}/categories`).then((resp) => {
            // define an empty array to hold the categories
            const categories = [];
            // Loop through the response and create a new category object for it
            resp.data.forEach((item, index) => {
                const category = new CategoryModel(
                    item.name,
                    item.theme_colour,
                    item.id,
                    item.average
                );

                categories.push(category);
            });
            // return the categories
            this.setState({categories: categories});

        }).catch(e => {

        })
    }

    // Function to determine if the categories have loaded or not so the app can display the next button
    hasCategories() {
        if(this.state.categories.length > 0) {
            return <Link to={`categories/${this.getFirstCategoryId()}`} className="btn btn-primary btn-block">{this.state.buttonText}</Link>
        }
    }
    // return the id of the first category in the categories list
    getFirstCategoryId() {
        return this.state.categories[0].id
    }
}

export default Survey;