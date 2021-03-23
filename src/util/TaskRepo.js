import {ArythmeticsTaskDef} from "../components/arythmetics-task/common";

let task1 = new ArythmeticsTaskDef("2+2", "4");
let task2 = new ArythmeticsTaskDef("3+3", "6");

class TaskRepo {
    allTasks = [task1, task2];

    getTasks() {
        return this.allTasks
    }

    getTask(id) {
        return this.allTasks.filter(t => t.id === id)[0]
    }
}

export default new TaskRepo()