const fs = require("fs");
const uuidv4 = require("uuid/v4");
const dateFormat = require("dateformat");

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
    return Math.floor((Math.random() * (max - min)) + min);
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
        for(let i = 0; i < num; i++){
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
        for(const tskFactory of this.taskFactories){
            hw.tasks.push(tskFactory.create())
        }
        return hw;
    }
}
class SumTaskFactory {
    min = 0;
    max;
    constructor(limit1, limit2) {
        if(limit2){
            this.min = limit1
            this.max = limit2
        }else{
            this.max = limit1
        }
    }
    create(){
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
        if(limit2){
            this.min = limit1
            this.max = limit2
        }else{
            this.max = limit1
        }
    }
    create(){
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
hwFactory.addTaskPlan(new SumTaskFactory(10), 5)
hwFactory.addTaskPlan(new MinusTaskFactory(2, 6), 2)
hwFactory.addTaskPlan(new SumTaskFactory(11, 15), 3)
hwFactory.addTaskPlan(new SumTaskFactory(16, 20), 1)
let data = {homeworks: [hwFactory.create()]};
fs.writeFile('public/import.json', JSON.stringify(data, null, 4), console.log);
console.log(data)

