import {v4 as uuidv4} from 'uuid'

export class TaskDef {
    id = uuidv4();
    type = "none";

    preview(){
        return ""
    }
}