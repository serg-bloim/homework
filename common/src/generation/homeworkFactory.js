import uuidv4 from "uuid/v4.js";
import dateFormat from 'dateformat'
import {tomorrow} from "./common.js";

export class HomeworkFactory {
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
            name: this.namePrefix + dateFormat(this.date, this.dateFormat),
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
        hw.tasks.forEach(task => delete task.__hash)
        return hw;
    }
}