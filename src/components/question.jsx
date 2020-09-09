import React, { Component } from 'react';
import AnswerModel from "../models/answer";
import CategoryModel from "../models/category";
class Question extends Component {
    /*
    state = {
        category: CategoryModel,
        title: 'Question 1',
        answers: []
    }

    constructor(props) {
        super(props);
        this.defineCategory();
        this.defineAnswers();
    }

    renderAnswers() {
    }

    render() {
        return (
            <div></div>
        )

    }

    defineAnswers() {
        let values = ['Daily', '3+ tines a week', '1 or 2 times', 'Not at all']
        for(let i = 0; i < values.length; i++) {
            const answer = new AnswerModel(
                values[i],
                i,
                1,
                i
            )
            this.state.answers.push(answer)
        }
    }

    defineCategory() {
        this.state.category = new CategoryModel(
            'Diet',
            '#FF4136'
        );
    }
    */
}

export default Question;