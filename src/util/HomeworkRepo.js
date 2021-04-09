import {Homework} from "./common";
import {generateTaskList} from "./generation";

function createDummyHomework() {
    let tasks = generateTaskList();
    return new Homework(tasks);
}

class HomeworkRepo {
    #activeHomework = createDummyHomework();

    getActiveHomework(){
        return this.#activeHomework;
    }
}

export default new HomeworkRepo()