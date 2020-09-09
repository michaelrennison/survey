/**
 * Define the model for an answer. An answer will have three properties, a title which will be
 * displayed to the user, a value that represents the answer that will be used in the calculations
 * when the answer is submitted, and a question id that represents which question the answer belongs to
 */
class AnswerModel {
    private id: Number;
    protected title: String;
    protected value: Number;
    private questionId: Number;
    public selected: Boolean
    constructor(title: String, value: Number, questionId: Number, id: Number) {
        this.title = title;
        this.value = value;
        this.questionId = questionId;
        this.id = id;
        this.selected = false;
    }
}

export default AnswerModel;