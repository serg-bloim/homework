import {v4 as uuidv4} from 'uuid'
import {ArythmeticsTaskDef} from "../components/arythmetics-task/common";
import {classToPlain, plainToClass, Type} from "class-transformer";

export class TaskDef {
    id = uuidv4();
    type = "none";

    preview(){
        return ""
    }

    createSolution(){
        throw new Error('You have to implement the method createSolution!');
    }

    /**
     * @type boolean
     */
    is_correct(){
        throw new Error('You have to implement the method is_correct!');
    }
    /**
     * @type boolean
     */
    toPlain(){
        throw new Error('You have to implement the method toPlain!');
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

    toString(){
        return this.task.preview()
    }

    /**
     * @type boolean
     */
    is_correct(){
        throw new Error('You have to implement the method is_correct!');
    }
}
export class TaskFactory {
    /**
     * @type TaskDef
     */
    createTask(){
        throw new Error('You have to implement the method createTask!');
    }
}

function convertTask(taskObj) {
    let clazz;
    switch (taskObj.__class) {
        case ArythmeticsTaskDef.TYPE_STR : clazz = ArythmeticsTaskDef
    }
    return plainToClass(clazz, taskObj)
}

export class Homework {
    static TYPE_STR = "Homework"
    __class=Homework.TYPE_STR
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

    toPlain() {
        let obj = classToPlain(this);
        obj.tasks = this.tasks.map(t => t.toPlain())
        return obj
    }

    static fromPlain(obj) {
        let hw = plainToClass(Homework, obj)
        hw.tasks = obj.tasks.map(convertTask);
        return hw;
    }

    static empty() {
        return new Homework([])
    }
}