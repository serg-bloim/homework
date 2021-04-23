import {v4 as uuidv4} from 'uuid'

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

