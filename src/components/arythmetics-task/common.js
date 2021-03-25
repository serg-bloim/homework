import {TaskDef, TaskSolutionState} from "../../util/common";

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

    createSolution() {
        return new ArythmeticsSolution(this)
    }
}
export class ArythmeticsSolution extends TaskSolutionState{
    solution;

    constructor(task) {
        super(task);
    }
}