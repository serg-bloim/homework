import {Homework} from "./common";
import {generateTaskList} from "./generation";
import {db} from "./db";

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

    reportTaskAnswer(isCorrect, taskId, timestamp, state) {
        db.tasks.put({id: taskId, solved: isCorrect, state: state})
            .catch(console.log)
        console.log(`Task(${taskId}) was solved ${isCorrect ? 'correctly' : 'wrong'}. On ${timestamp}(${new Date(timestamp)}) Details: ${JSON.stringify(state)}`)
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
                return task?.state ?? {}
            })

    }
}

export default new HomeworkRepo()