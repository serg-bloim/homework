import {Homework} from "./common";
import {generateTaskList} from "./generation";
import {db} from "./db";

function createDummyHomework() {
    let tasks = generateTaskList();
    return new Homework(tasks);
}

class HomeworkRepo {
    #activeHomework = createDummyHomework();

    async getActiveHomework(){
        let jsonObj = await db.homeworks.get({status:'active'});
        return Homework.fromPlain(jsonObj)
    }

    reportTaskAnswer(status, taskId, timestamp, ans) {
        console.log(`Task(${taskId}) was solved ${status}. On ${timestamp}(${new Date(timestamp)}) Details: ${JSON.stringify(ans)}`)
    }

    async getAllHomeworks() {
        return db.homeworks.toArray().then(arr=>arr.map(Homework.fromPlain));
    }

    async setActive(homework) {
        await db.homeworks
            .where("status")
            .equals(Homework.STATUS.ACTIVE)
            .modify({status:Homework.STATUS.NEW})
        return db.homeworks.update(homework.id, {status:Homework.STATUS.ACTIVE})
    }
}

export default new HomeworkRepo()