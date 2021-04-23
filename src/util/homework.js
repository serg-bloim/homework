import {v4 as uuidv4} from "uuid";
import {classToPlain, plainToClass} from "class-transformer";
import _ from "lodash";
import {ArythmeticsTaskDef} from "../components/arythmetics-task/common";
import OptionsTask from "../components/options-task/OptionsTask";
import {OptionsTaskDef} from "../components/options-task/options-task";


const str2class = _.keyBy([ArythmeticsTaskDef, OptionsTaskDef], c => c.TYPE_STR)
console.log("str2class")
console.log(str2class)
function convertTask(taskObj) {
    let clazz = str2class[taskObj.__class]
    // clazz = ArythmeticsTaskDef
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