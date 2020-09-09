import React, { Component } from 'react';
import QuestionModel from "../models/question";
import axios from "axios";
import CategoryModel from "../models/category";
import AnswerModel from "../models/answer";
import Answer from "./answer";
import CategoryProgress from "./categoryProgress";
import { Router, Link } from "react-router-dom";
import Result from "./result";

const config = require('../config.json');
class Category extends Component {


    progressBars = []

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            id: null,
            activeQuestion: null,
            lastQuestion: false,
            categories: null,
            progress: 0,
            total: 0,
            activeCategory: null,
            answerSelected: false,
            showResults: false,
        }
        this.handler = this.handler.bind(this)
        this.state.id = this.props.match.params.categoryId;
        this.initialize()
    }

    handler(categoryId) {
        this.state.id = categoryId;
        this.updateActiveCategory();
        this.initialize()
    }

    initialize() {
        this.answerSelectionHandler = this.answerSelectionHandler.bind(this);
        this.state.showResults = false;
        const path = this.props.location.pathname;
        // get id from the url
        if(!this.state.categories) {
            this.getAllCategories();
        }
        // get the category id from the props
        // get the questions related to this category
        this.getQuestions();
    }

    changeProgress() {
        const index = this.state.questions.indexOf(this.state.activeQuestion) + 1;
        const progress = ((index) / this.state.questions.length) * 100;
        this.setState({progress: progress});
        this.state.categories[this.state.activeCategory.id - 1].progress = progress;
        this.progressBars[this.state.activeCategory.id].updateState(progress)
    }

    render() {
        if(this.state.showResults === false) {
            console.log(this.state.categories)
            return <div className="p-5">
                {this.checkForCategories()}
                {this.displayActiveQuestion()}
            </div>
        } else {
            return <Result handler = { this.handler } total={this.state.total} categoryId={this.state.id} />
        }
    }

    checkForCategories() {
        if(this.state.categories) {
            return <div className="container">
                <div className="row px-4">
                    {this.state.categories.map( cat => <CategoryProgress ref={(ip) => {this.progressBars[cat.id] = ip}} active={this.state.id} category={cat} changeProgress={this.changeProgress} />)}
                </div>
            </div>;
        }
    }

    handleCategoryChange() {
        // Call the function to reset category, can't be done here as this is binded to the result component
        this.resetCategory()
    }

    resetCategory() {
        this.initialize()
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
            if (this.state.questions.length > 0) {
                this.getActiveQuestion();
            }
        }).catch(e => {

        })
    }

    getActiveQuestion() {
        const question = this.state.questions[0]
        this.setState({activeQuestion: question});
        this.getActiveQuestionAnswers()
    }

    displayActiveQuestion() {
        if (this.state.activeQuestion !== null) {
            return <React.Fragment>
                <h5 className="font-weight-bold">{this.state.activeQuestion.title}</h5>
                {this.displayActiveQuestionAnswers()}
                {this.getNextButton()}
            </React.Fragment>
        } else {
            return <React.Fragment>
                <p>Loading...</p>
            </React.Fragment>
        }
    }

    getActiveQuestionAnswers() {
        // get answers for the active question from the backend
        axios.get(`${config.server}/questions/${this.state.activeQuestion.id}`).then(resp => {
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
        return <div className="container-fluid">
            <div className="row">
                {this.state.activeQuestion.answers.map(answer => <Answer handler={this.answerSelectionHandler} key={answer.id} category={this.state.activeCategory} answer={answer}/>)}
            </div>
        </div>;
    }

    nextQuestion = () => {
        // add the value of the selected answer to the total
        for(let i = 0; i < this.state.activeQuestion.answers.length; i++) {
            if(this.state.activeQuestion.answers[i].selected) {
                this.state.total += this.state.activeQuestion.answers[i].value;
            }
        }
        this.setState({answerSelected: false})
        // Check the index of the current active question
        const index = this.state.questions.indexOf(this.state.activeQuestion);
        // Check if this is the last question for this category
        if (index !== this.state.questions.length - 1) {
            // Show the next question
            const question = this.state.questions[index + 1];
            this.setState({activeQuestion: question})
            this.getActiveQuestionAnswers();

            this.changeProgress()
            if(index === this.state.questions.length - 2) {
                this.state.lastQuestion = true;
            }
        } else {
            this.state.categories[this.state.activeCategory.id - 1].progress = 100;
            this.setState({showResults: true});
        }

    }

    answerSelectionHandler = (answer, selected) => {
        this.setState({answerSelected: selected})

        this.state.activeQuestion.answers.forEach((item, index) => {
            // Set the value of selected for the answer
            if(item.id === answer) {
                item.selected = selected
            }

            // If the value is true, for every answer that isn't this one set the value to false
            if(selected === true && item.id !== answer) {
                item.selected = false;
            }
        });
        this.setState({activeQuestion: this.state.activeQuestion});
    }

    getNextButton() {
        return <button disabled={!this.state.answerSelected} onClick={this.nextQuestion.bind(this)} className="btn btn-primary btn-block mt-3">{ this.state.lastQuestion ? 'Results' : 'Next Question' }</button>;
    }

    getAllCategories() {
        axios.get(`${config.server}/categories`).then((resp) => {
            // define an empty array to hold the categories
            const categories = [];
            // Loop through the response and create a new category object for it
            resp.data.forEach((item, index) => {
                const category = new CategoryModel(
                    item.name,
                    item.theme_colour,
                    item.id
                );

                categories.push(category);

                // Set the active category by the id of the categories received in the backend
                if(item.id == this.state.id) {
                    this.setState({activeCategory: category});
                }
            });
            // return the categories
            this.setState({categories: categories});
        });
    }

    updateActiveCategory() {
        this.state.categories.forEach((item, index) => {
            if(item.id == this.state.id) {
                this.setState({activeCategory: item});
            }
        });
    }
}

export default Category;