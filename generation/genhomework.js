import uuidv4 from 'uuid/v4.js'
import dateFormat from 'dateformat'
import * as fs from 'fs'
import {imgs} from "./images.js";
import {tomorrow} from "homework-common/src/generation/common.js";
import {SumTaskFactory} from "homework-common/src/generation/sumTaskFactory.js";
import {MinusTaskFactory} from "homework-common/src/generation/minusTaskFactory.js";
import {AudioNumberTaskFactory} from "homework-common/src/generation/AudioNumberTaskFactory.js";
import {OptionsTaskFactory} from "homework-common/src/generation/OptionsTaskFactory.js";
import {HomeworkFactory} from "homework-common/src/generation/homeworkFactory.js";

let prefix = 'Homework '
let startDate = tomorrow(new Date())
let nameFormatStr = 'yyyy/mm/dd'
const n = 1



function generateTasks() {
    return [];
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


let hwFactory = new HomeworkFactory()

hwFactory.addTaskPlan(new SumTaskFactory(5, 10), 2)
hwFactory.addTaskPlan(new SumTaskFactory(5, 15), 3)
hwFactory.addTaskPlan(new MinusTaskFactory(5,10), 2)
hwFactory.addTaskPlan(new AudioNumberTaskFactory(1, 50), 5)
hwFactory.addTaskPlan(new OptionsTaskFactory(imgs, 20), 5)
// hwFactory.addTaskPlan(new SumWithTensFactory(1, 3), 4)
// hwFactory.addTaskPlan(new SumTaskFactory(16, 20), 1)
let data = {homeworks: [hwFactory.create()]};
fs.writeFile('../data/import.json', JSON.stringify(data, null, 4), console.log);
for (const hw of data.homeworks) {
    console.log("-------")
    for (let t of hw.tasks) {
        console.log((t.problem??"audio") + " = " + (t.correctAnswer ?? t.expected))
    }
}

