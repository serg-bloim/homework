import {create_array} from "homework-common/src/util/arrays";
import {SumTaskFactory} from "homework-common/src/components/SumTaskFactory";

let taskFactory = new SumTaskFactory();

/**
 * @type TaskDef[]
 */
export function generateTaskList(){
    return create_array(5, () => taskFactory.createTask())
}