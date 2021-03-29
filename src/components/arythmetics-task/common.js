import {TaskDef, TaskSolutionState} from "../../util/common";

export class ArythmeticsTaskDef extends TaskDef{
    answer;
    problem;
    constructor(problem, answer) {
        super();
        this.problem = problem;
        this.answer = answer;
    }

    preview(answer = "?") {
        return this.problem + " = " + answer
    }

    createSolution() {
        return new ArythmeticsSolution(this)
    }
}
export class ArythmeticsSolution extends TaskSolutionState{
    /**
     * @type ArythmeticsTaskDef
     */
    task;
    answer;

    constructor(task) {
        super(task);
    }

    toString(){
        return this.task.preview(this.answer)
    }

    is_correct() {
        return this.answer === this.task.answer
    }
}