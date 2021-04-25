import uuidv4 from 'uuid/v4.js'
import dateFormat from 'dateformat'
import random from 'random'
import * as fs from 'fs'
import _ from 'lodash'
import {TaskFactory} from "./TaskFactory.js";
import {OptionsTaskFactory} from "./OptionsTaskFactory.js";

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
            const ignoreIdComparator = function (val1, val2, key) {
                if (key === 'id') return true
            }
            for (let e of arr) {
                if (_.isEqualWith(e, obj, ignoreIdComparator))
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
        return hw;
    }
}

function renderArythmeticTask(problem, correctAnswer) {
    return {
        id: uuidv4(),
        type: "none",
        __class: "ArythmeticsTaskDef",
        __ver: "1",
        correctAnswer: correctAnswer,
        problem: problem
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
        let b = rand(1, 10)
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
// hwFactory.addTaskPlan(new SumTaskFactory(3, 10), 4)
// hwFactory.addTaskPlan(new MinusTaskFactory(4, 8), 3)
// hwFactory.addTaskPlan(new SumTaskFactory(11, 15), 4)
hwFactory.addTaskPlan(new OptionsTaskFactory(20), 10)
// hwFactory.addTaskPlan(new SumWithTensFactory(1, 3), 4)
// hwFactory.addTaskPlan(new SumTaskFactory(16, 20), 1)
let data = {homeworks: [hwFactory.create()]};
fs.writeFile('../data/import.json', JSON.stringify(data, null, 4), console.log);
for (const hw of data.homeworks) {
    console.log("-------")
    for (let t of hw.tasks) {
        console.log(t.problem + " = " + t.correctAnswer)
    }
}

