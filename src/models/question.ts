/**
 * Define the model for a question, A question will have two properties, a title
 * which is to be displayed as the question being asked and a category id for that
 * represents the category that the question belongs to
 */
import AnswerModel from "./answer";

class QuestionModel {
    protected title: String;
    private categoryId: Number;
    public answers: Array<AnswerModel>;
    private id: Number;

    constructor(title: String, categoryId: Number, id: Number) {
        this.title = title;
        this.categoryId = categoryId;
        this.answers = [];
        this.id = id;
    }
}

export default QuestionModel