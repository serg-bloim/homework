import {classToPlain} from "class-transformer";
import {TaskDef} from "../util/taskDef";


export class OptionsTaskDef extends TaskDef{
    static TYPE_STR = "OptionsTaskDef"
    problem;
    options=[]
    correctOption=0
    selected;

    constructor(problem, options, correctOption) {
        super(OptionsTaskDef.TYPE_STR);
        this.problem = problem;
        this.options = options
        this.correctOption = correctOption
    }

    preview() {
        return this.problem
    }

    toString() {
        let answr = undefined
        if (this.answer) {
            answr = this.answer
        }
        return this.preview(answr)
    }

    is_correct() {
        return this.selected === this.correctOption
    }

    toPlain() {
        return classToPlain(this);
    }

    getState() {
        return {
            selected: this.selected
        }
    }

    setState(state) {
        this.selected = state.selected
    }

    hasAnswer() {
        return (typeof this.selected) === 'number' && this.selected >= 0 && this.selected < this.options.length
    }

    createSubmission() {
        return {
            problem: this.problem, answer: this.selected, expected: this.correctOption, correct: this.is_correct(), options: this.options
        }
    }
}