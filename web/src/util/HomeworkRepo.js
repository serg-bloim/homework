import {generateTaskList} from "./generation";
import {db} from "./db";
import {log} from "./LogRepo";
import {Homework} from "homework-common/src/util/homework";

function createDummyHomework() {
    let tasks = generateTaskList();
    return new Homework(tasks);
}

class HomeworkRepo {
    #activeHomework = createDummyHomework();

    async getActiveHomework() {
        let jsonObj = await db.homeworks.get({status: 'active'});
        return Homework.fromPlain(jsonObj)
    }

    /**
     *
     * @param isCorrect
     * @param {TaskDef} task
     */
    reportTaskAnswer(isCorrect, task, ans) {
        let taskId = task.id;
        let state = task.getState();
        db.tasks.put({id: taskId, solved: isCorrect, state: state})
            .catch(console.log)
        let isCorrectStr = isCorrect ? 'correctly' : 'wrong';
        log('task-answer', `${task.toString()}`, task.id, ans)
        console.log(`Task(${taskId}) was solved ${isCorrectStr}. Details: ${JSON.stringify(ans)}`)
    }

    async getAllHomeworks() {
        return db.homeworks.toArray().then(arr => (arr??[]).map(Homework.fromPlain));
    }

    async setActive(homework) {
        await db.homeworks
            .where("status")
            .equals(Homework.STATUS.ACTIVE)
            .modify({status: Homework.STATUS.NEW})
        return db.homeworks.update(homework.id, {status: Homework.STATUS.ACTIVE})
    }

    async getTaskState(id) {
        return db.tasks.get(id)
            .then(task => {
                return task ?? {}
            })

    }

    /**
     * @param {Homework} homework
     * @return {Promise<string>}
     */
    async addHomework(homework){
        return db.homeworks.add(homework.toPlain())
    }
}

export default new HomeworkRepo()