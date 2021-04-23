import {TaskFactory} from "../util/taskFactory";
import {ArythmeticsTaskDef} from "./ArythmeticsTaskDef";

export class SumTaskFactory extends TaskFactory {
    limit = 15;

    constructor(limit = 10) {
        super();
        this.limit = limit;
    }

    createTask() {
        let a = rand(0, this.limit)
        let b = rand(0, this.limit)
        let res = a + b
        return new ArythmeticsTaskDef(`${a} + ${b}`, res.toString())
    }
}

function rand(min, max) {
    return Math.floor((Math.random() * (min + max)) + min);
}