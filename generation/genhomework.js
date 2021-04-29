import uuidv4 from 'uuid/v4.js'
import dateFormat from 'dateformat'
import random from 'random'
import * as fs from 'fs'
import {TaskFactory} from "./TaskFactory.js";
import {AudioNumberTaskFactory} from "./AudioNumberTaskFactory.js";
import {audioCollection} from "./audio-numbers.js";
import {create_seq} from "homework-common/src/util/arrays.js";
import _ from 'lodash'
import {debug} from "../common/src/util/basic.js";

let prefix = 'Homework '
let startDate = tomorrow(new Date())
let nameFormatStr = 'yyyy/mm/dd'
const n = 1

function tomorrow(date) {
    let day = 24 * 60 * 60 * 1000;
    return new Date(date.getTime() + day)
}

function generateTasks() {
    return [];
}

function rand(min, max) {
    return random.int(min, max)
}

function generateSumTask(limit) {
    let res = rand(0, limit)
    let a = rand(0, res)
    let b = res - a
    return {
        id: uuidv4(),
        type: "none",
        __class: "ArythmeticsTaskDef",
        correctAnswer: a + b,
        problem: `${a} + ${b}`
    };
}

function generateTask() {
    return generateSumTask(15)
}

function create_array(len, func) {
    let arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(func(i))
    }
    return arr;
}

function generateHomework() {
    let hw = {
        id: uuidv4(),
        name: 'Homework ' + dateFormat(startDate, nameFormatStr),
        __class: "Homework",
        status: "new",
    };
    hw.tasks = create_array(10, () => generateTask())
    return hw;
}


class HomeworkFactory {
    namePrefix = "Homework "
    dateFormat = 'yyyy/mm/dd'
    date = tomorrow(new Date())
    taskFactories = []

    addTaskPlan(taskFactory, num) {
        for (let i = 0; i < num; i++) {
            this.taskFactories.push(taskFactory)
        }
    }

    create() {
        let hw = {
            id: uuidv4(),
            name: this.namePrefix + dateFormat(this.startDate, this.dateFormat),
            __class: "Homework",
            __ver: "1",
            status: "new",
            tasks: [],
        };

        function contains(arr, obj) {
            // const ignoreIdComparator = function (val1, val2, key) {
            //     if (key === 'id') return true
            // }
            for (let e of arr) {
                if (e.__class === obj.__class && e.__hash === obj.__hash)
                    return true
            }
            return false
        }

        for (const tskFactory of this.taskFactories) {
            for (let i = 0; i < 100; i++) {
                let task = tskFactory.create();
                if (!contains(hw.tasks, task)) {
                    hw.tasks.push(task)
                    break
                }
            }
        }
        hw.tasks.forEach(task=>delete task.__hash)
        return hw;
    }
}

function renderArythmeticTask(problem, correctAnswer) {
    return {
        id: uuidv4(),
        type: "none",
        __class: "ArythmeticsTaskDef",
        __ver: "2",
        correctAnswer: correctAnswer,
        problem: problem,
        __hash: problem
    };
}

class SumTaskFactory extends TaskFactory {
    min = 0;
    max;

    constructor(min, max) {
        super();
        this.min = min
        this.max = max
    }

    create() {
        let res = rand(this.min, this.max)
        let a = rand(1, res - 1)
        let b = res - a
        return this.render(a, b);
    }

    render(a, b) {
        let correctAnswer = a + b;
        let problem = `${a} + ${b}`;
        return renderArythmeticTask(problem, correctAnswer);
    }
}

class SumWithTensFactory extends SumTaskFactory {
    create() {
        let a = rand(this.min, this.max)*10
        let b = rand(1, 9)
        return this.render(a, b)
    }
}

class MinusTaskFactory extends TaskFactory{
    min = 0;
    max;

    constructor(limit1, limit2) {
        super();
        if (limit2) {
            this.min = limit1
            this.max = limit2
        } else {
            this.max = limit1
        }
    }

    create() {
        let a = rand(this.min, this.max)
        let b = rand(1, a)
        let correctAnswer = a - b;
        let problem = `${a} - ${b}`;
        return renderArythmeticTask(problem, correctAnswer)
    }
}

let hwFactory = new HomeworkFactory()

hwFactory.addTaskPlan(new SumTaskFactory(5, 10), 2)
hwFactory.addTaskPlan(new SumTaskFactory(5, 15), 3)
hwFactory.addTaskPlan(new MinusTaskFactory(5,10), 2)
hwFactory.addTaskPlan(new AudioNumberTaskFactory(audioCollection, 1, 50), 5)
hwFactory.addTaskPlan(new SumWithTensFactory(1, 3), 4)
hwFactory.addTaskPlan(new SumTaskFactory(16, 20), 1)
let data = {homeworks: [hwFactory.create()]};
fs.writeFile('../data/import.json', JSON.stringify(data, null, 4), console.log);
for (const hw of data.homeworks) {
    console.log("-------")
    for (let t of hw.tasks) {
        console.log((t.problem??"audio") + " = " + (t.correctAnswer ?? t.expected))
    }
}

