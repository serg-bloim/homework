import {ArythmeticsTaskDef, SumTaskFactory} from "../components/arythmetics-task/common";

let taskFactory = new SumTaskFactory(5)
let tsks = Array.from({length:3},()=>taskFactory.createTask())
console.log(tsks)
class TaskRepo {
    allTasks = tsks;

    getTasks() {
        return this.allTasks
    }

    getTask(id) {
        return this.allTasks.filter(t => t.id === id)[0]
    }
}

export default new TaskRepo()