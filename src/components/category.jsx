import React, { Component } from 'react';
import QuestionModel from "../models/question";
import axios from "axios";
import CategoryModel from "../models/category";
import AnswerModel from "../models/answer";
import Answer from "./answer";

const config = require('../config.json');
class Category extends Component {
    state = {
        questions: [],
        id: null,
        activeQuestion: null
    }
    constructor(props) {
        super(props);
        const id = this.props.match.params.categoryId
        console.log(this.props);
        // get the category id from the props
        this.state.id = id;
        // get the questions related to this category
        this.getQuestions();
    }
    render() {
        return <React.Fragment>
            <h1>Hello World</h1>
            {this.displayActiveQuestion()}
        </React.Fragment>
    }

    getQuestions() {
        // get questions from the backend using the category id
        axios.get(`${config.server}/categories/${this.state.id}`).then(resp => {
            // define an empty array to hold the questions
            const questions = [];
            // Loop through the response and create a new question object for it
            resp.data.forEach((item, index) => {
                const question = new QuestionModel(
                    item.title,
                    item.categoryId,
                    item.id
                );

                questions.push(question);
            });
            // update the component state to contain the retrieved questions
            this.setState({questions: questions});

            // check if the questions have been populated and set the active question
            if(this.state.questions.length > 0) {
                this.getActiveQuestion();
            }
        }).catch( e => {

        })
    }

    getActiveQuestion() {
        const question = this.state.questions[0]
        this.setState({activeQuestion: question});
        this.getActiveQuestionAnswers()
    }

    displayActiveQuestion() {
        if(this.state.activeQuestion !== null) {
            return <React.Fragment>
                <h1>{ this.state.activeQuestion.title }</h1>
                { this.displayActiveQuestionAnswers() }
                <button onClick={this.nextQuestion.bind(this)} className="btn btn-primary">Next question</button>
            </React.Fragment>
        } else {
            return  <React.Fragment>
                <p>Loading...</p>
            </React.Fragment>
        }
    }

    getActiveQuestionAnswers() {
        // get answers for the active question from the backend
        axios.get(`${config.server}/questions/${this.state.activeQuestion.id}`).then(resp => {
            console.log(resp);
            // define an empty array to hold the answers
            const answers = [];
            // Loop through the response and create a new question object for it
            resp.data.forEach((item, index) => {
                const answer = new AnswerModel(
                    item.title,
                    item.value,
                    item.questionId,
                    item.id
                );
                answers.push(answer);
            });
            // Set the answers for the active question and update the state
            this.state.activeQuestion.answers = answers;
            const activeQuestion = this.state.activeQuestion
            this.setState({activeQuestion: activeQuestion});
        })
    }

    displayActiveQuestionAnswers() {

        if (this.state.activeQuestion.answers.length === 0) return <p>This question does not have any answers</p>
        return <div>{ this.state.activeQuestion.answers.map( answer => <Answer key={answer.id} answer={answer} />)}</div>;
    }

    nextQuestion = () =>  {
        // Check the index of the current active question
        const index = this.state.questions.indexOf(this.state.activeQuestion);
        // Check if this is the last question for this category
        if(index === this.state.questions.length - 1) {
            // Do something
        } else {
            // Show the next question
            const question = this.state.questions[index + 1];
            this.setState({activeQuestion: question})
            this.getActiveQuestionAnswers();
        }
    }
}

export default Category;