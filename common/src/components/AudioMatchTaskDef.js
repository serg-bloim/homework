import {TaskDef} from "../util/taskDef";
import {classToPlain} from "class-transformer";

export class AudioMatchTaskDef extends TaskDef{
    static TYPE_STR = "AudioMatchTaskDef"
    audioUrl
    expected
    answer
    constructor(audioUrl, expected) {
        super(AudioMatchTaskDef.TYPE_STR);
        this.audioUrl = audioUrl;
        this.expected = expected?.toString();
    }

    preview(ans = "?") {
        return "audio = " + ans
    }

    toString() {
        let answr = undefined
        if (this.answer) {
            answr = this.answer
        }
        return this.preview(answr)
    }

    /**
     * @type boolean
     */
    is_correct() {
        return this.answer?.toString() === this.expected?.toString()
    }

    /**
     * @type {Object}
     */
    toPlain() {
        return classToPlain(this);
    }

    /**
     * @type {Object}
     */
    getState() {
        return {
            answer: this.answer
        }
    }

    /**
     * @param {Object} state
     */
    setState(state) {
        this.answer = state.answer
    }

    hasAnswer() {
        return (typeof this.answer) === 'string' && this.answer.length > 0
    }

    /**
     * @return {{problem:string, answer, correct: (boolean), expected}}
     */
    createSubmission() {
        return {
            problem: this.audioUrl, answer: this.answer, expected: this.expected, correct: this.is_correct()
        }
    }
}