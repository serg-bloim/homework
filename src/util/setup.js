import {db} from "./db";
import {v4 as uuidv4} from 'uuid'
import {generateTaskList} from "./generation";
import {Homework} from "./common";
import {ArythmeticsTaskDef} from "../components/arythmetics-task/common";
import {classToPlain, deserialize, plainToClass, serialize, Type} from "class-transformer";

export function setup() {
    db.version(1).stores({
        homeworks: 'id, status, class',
    });
    window.db = db
    let id = '123-456-789';
    // Promise.all([
    //         db.homeworks.put({
    //             id: '0160d846-9a7a-11eb-a8b3-0242ac130003',
    //             name: uuidv4(),
    //             status: 'active',
    //             tasks: generateTaskList()
    //         }),
    //         db.homeworks.put({id: '0160dad0-9a7a-11eb-a8b3-0242ac130003', name: 'qwerty2', status: 'new', tasks: []}),
    //         db.homeworks.put({id: '0160dbde-9a7a-11eb-a8b3-0242ac130003', name: 'qwerty3', status: 'new', tasks: []}),
    //     ]
    // ).then(function (result) {
    //     console.log(result)
    //     return db.homeworks.get(id)
    // }).then(function (result) {
    //     console.log("db.homeworks.get(id)")
    //     console.log(result)
    // }).catch(function (error) {
    //     alert("Ooops: " + error);
    // });
}
