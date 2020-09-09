import React, { Component } from 'react';
import QuestionModel from "../models/question";

class Category extends Component {
    state = {
        questions: [QuestionModel]
    }
    render() {
        return <h1>Hello World</h1>
    }
}

export default Category;