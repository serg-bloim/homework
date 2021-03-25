import {v4 as uuidv4} from 'uuid'

export class TaskDef {
    id = uuidv4();
    type = "none";

    preview(){
        return ""
    }

    createSolution(){
        throw new Error('You have to implement the method createSolution!');
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
}