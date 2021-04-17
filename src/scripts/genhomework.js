const fs = require("fs");
const uuidv4 = require("uuid/v4");
const dateFormat = require("dateformat");
const _ = require('lodash');
const random = require('random');

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
            status: "new",
            tasks: [],
        };

        function contains(arr, obj) {
            const ignoreIdComparator = function (val1, val2, key) {
                if(key==='id') return true
            }
            for(let e of arr){
                if(_.isEqualWith(e, obj, ignoreIdComparator))
                    return true
            }
            return false
        }

        for (const tskFactory of this.taskFactories) {
            for(let i=0; i<100; i++){
                let task = tskFactory.create();
                if(!contains(hw.tasks, task))
                {
                    hw.tasks.push(task)
                    break
                }
            }
        }
        return hw;
    }
}

class SumTaskFactory {
    min = 0;
    max;

    constructor(min, max) {
        this.min = min
        this.max = max
    }

    create() {
        let res = rand(this.min, this.max)
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
}

class MinusTaskFactory {
    min = 0;
    max;

    constructor(limit1, limit2) {
        if (limit2) {
            this.min = limit1
            this.max = limit2
        } else {
            this.max = limit1
        }
    }

    create() {
        let a = rand(this.min, this.max)
        let b = rand(0, a)
        let res = a - b
        return {
            id: uuidv4(),
            type: "none",
            __class: "ArythmeticsTaskDef",
            correctAnswer: a - b,
            problem: `${a} - ${b}`
        };
    }
}


let hwFactory = new HomeworkFactory()
hwFactory.addTaskPlan(new SumTaskFactory(3, 10), 5)
hwFactory.addTaskPlan(new MinusTaskFactory(2, 6), 2)
hwFactory.addTaskPlan(new SumTaskFactory(11, 15), 3)
hwFactory.addTaskPlan(new SumTaskFactory(16, 20), 1)
let data = {homeworks: [hwFactory.create()]};
fs.writeFile('public/import.json', JSON.stringify(data, null, 4), console.log);
for( const hw of data.homeworks){
    console.log("-------")
for (let t of  hw.tasks){
    console.log(t.problem + " = " + t.correctAnswer)
}

}

