import {TaskDef} from "../../util/common";

export class ArythmeticsTaskDef extends TaskDef{
    answer;
    problem;
    constructor(problem, answer) {
        super();
        this.problem = problem;
        this.answer = answer;
    }


    preview() {
        return this.problem + " = ?"
    }
}