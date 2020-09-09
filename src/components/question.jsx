import React, { Component } from 'react';
import AnswerModel from "../models/answer";
class Question extends Component {
    state = {
        title: '',
        answers: [AnswerModel]
    }
    render() {
        return <h1>Hello World</h1>
    }

    defineAnswers() {
        let values = ['Daily', '3+ tines a week', '1 or 2 times', 'Not at all']
        values.forEach(this.createAnswer)
    }

    createAnswer(item, index) {
        const answer = new AnswerModel(
            item,
            index,
            1
        )
        this.state.answers.push(answer)
    }
}

export default Question;