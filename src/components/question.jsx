import React, { Component } from 'react';
import AnswerModel from "../models/answer";
import CategoryModel from "../models/category";
class Question extends Component {
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
        if (this.state.answers.length === 0) return <p>This question does not have any answers</p>
        return <ul>{ this.state.answers.map( answer => <li key={answer.id}>{ answer.title }</li>) }</ul>
    }

    render() {
        return (
            <React.Fragment>
                <h1>{ this.state.title }</h1>
                {this.renderAnswers()}
                <button className="btn btn-primary">Next question</button>
            </React.Fragment>
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
}

export default Question;