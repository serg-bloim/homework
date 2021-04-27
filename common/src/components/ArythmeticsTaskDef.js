import {classToPlain} from "class-transformer";
import {TaskDef} from "../util/taskDef";

export class ArythmeticsTaskDef extends TaskDef {
    static TYPE_STR = "ArythmeticsTaskDef"
    correctAnswer;
    problem;
    answer;
    __ver=1;

    constructor(problem, correctAnswer) {
        super(ArythmeticsTaskDef.TYPE_STR);
        this.problem = problem;
        this.correctAnswer = correctAnswer;
    }

    preview(answer = "?") {
        return this.problem + " = " + answer
    }

    toString() {
        let answr = undefined
        if (this.answer) {
            answr = this.answer
        }
        return this.preview(answr)
    }

    is_correct() {
        return this.answer?.toString?.() === this.correctAnswer.toString()
    }

    toPlain() {
        return classToPlain(this);
    }

    getState() {
        return {
            answer: this.answer
        }
    }

    setState(state) {
        this.answer = state.answer
    }

    hasAnswer() {
        return (typeof this.answer) === 'string' && this.answer.length > 0
    }

    createSubmission() {
        return {
            taskClass: this.__class, problem: this.problem, answer: this.answer, expected: this.correctAnswer, correct: this.is_correct(), __ver: this.__ver
        }
    }
}