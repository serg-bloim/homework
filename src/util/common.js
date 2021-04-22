import {v4 as uuidv4} from 'uuid'
import {ArythmeticsTaskDef} from "../components/arythmetics-task/common";
import {classToPlain, plainToClass} from "class-transformer";

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

function convertTask(taskObj) {
    let clazz;
    switch (taskObj.__class) {
        case ArythmeticsTaskDef.TYPE_STR :
            clazz = ArythmeticsTaskDef
    }
    return plainToClass(clazz, taskObj)
}

export class Homework {
    static TYPE_STR = "Homework"
    __class = Homework.TYPE_STR
    /**
     * @type {string}
     */
    id = uuidv4();
    /**
     * @type {string}
     */
    name = this.id;
    /**
     * @type {string}
     */
    status = Homework.STATUS.NEW;
    /**
     * @type {TaskDef[]}
     */
    tasks;

    /**
     * @param {TaskDef[]} tasks
     */
    constructor(tasks) {
        this.tasks = tasks
    }

    isActive() {
        return this.status === Homework.STATUS.ACTIVE;
    }

    toPlain() {
        let obj = classToPlain(this);
        obj.tasks = this.tasks.map(t => t.toPlain())
        return obj
    }

    static fromPlain(obj) {
        if (obj) {
            let hw = plainToClass(Homework, obj)
            hw.tasks = obj.tasks.map(convertTask);
            return hw;
        } else {
            return Homework.empty()
        }
    }

    static empty() {
        return new Homework([])
    }

    static STATUS = {
        NEW: "new",
        ACTIVE: "active",
        SOLVED: "solved",
    }
}