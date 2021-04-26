import {db} from "./db";
import {debug} from "homework-common/src/util/basic";

export function exportDB(){
    return Promise.all([
        db.homeworks.toArray(),
        db.tasks.toArray(),
        db.logs.toArray()])
        .then(([homeworks, tasks, logs]) => {
            debug(homeworks)
            debug(tasks)
            debug(logs)
            return{
                homeworks, tasks, logs
            }
        })
}