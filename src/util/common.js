import {v4 as uuidv4} from 'uuid'
import {ArythmeticsTaskDef} from "../components/arythmetics-task/common";
import {plainToClass} from "class-transformer";
import _ from 'lodash'

export class TaskDef {
    id = uuidv4();
    type = "none";

    preview() {
        return ""
    }

    createSolution() {
        throw new Error('You have to implement the method createSolution!');
    }

    /**
     * @type boolean
     */
    is_correct() {
        throw new Error('You have to implement the method is_correct!');
    }

    /**
     * @type {Object}
     */
    toPlain() {
        throw new Error('You have to implement the method toPlain!');
    }

    /**
     * @type {Object}
     */
    getState() {
        throw new Error('You have to implement the method toPlain!');
    }

    /**
     * @param {Object} state
     */
    setState(state) {
        throw new Error('You have to implement the method toPlain!');
    }

    hasAnswer() {
        throw new Error('You have to implement the method hasAnswer!');
    }

    /**
     * @return {{problem:string, answer, correct: (boolean), expected}}
     */
    createSubmission(){
        throw new Error('You have to implement the method createSubmission!');
    }
}

export class TaskSolutionState {
    id = uuidv4();
    /**
     * @type TaskDef
     */
    task;

    constructor(task) {
        this.task = task;
    }

    toString() {
        return this.task.preview()
    }

    /**
     * @type boolean
     */
    is_correct() {
        throw new Error('You have to implement the method is_correct!');
    }
}

export class TaskFactory {
    /**
     * @type TaskDef
     */
    createTask() {
        throw new Error('You have to implement the method createTask!');
    }
}

