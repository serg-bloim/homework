import {SumTaskFactory} from "../components/arythmetics-task/common";
import {create_array} from "./arrays";

let taskFactory = new SumTaskFactory();

/**
 * @type TaskDef[]
 */
export function generateTaskList(){
    return create_array(5, () => taskFactory.createTask())
}