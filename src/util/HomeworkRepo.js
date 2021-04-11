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
}

export default new HomeworkRepo()