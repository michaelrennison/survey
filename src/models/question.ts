/**
 * Define the model for a question, A question will have two properties, a title
 * which is to be displayed as the question being asked and a category id for that
 * represents the category that the question belongs to
 */

class QuestionModel {
    protected title: String;
    private categoryId: Number;

    constructor(title: String, categoryId: Number) {
        this.title = title;
        this.categoryId = categoryId;
    }
}

export default QuestionModel