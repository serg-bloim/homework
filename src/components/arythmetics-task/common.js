import {TaskDef, TaskFactory, TaskSolutionState} from "../../util/common";

export class ArythmeticsTaskDef extends TaskDef{
    correctAnswer;
    problem;
    answer;
    constructor(problem, correctAnswer) {
        super();
        this.problem = problem;
        this.correctAnswer = correctAnswer;
    }

    preview(answer = "?") {
        return this.problem + " = " + answer
    }

    toString(){
        return this.preview?.(this.answer)
    }

    is_correct() {
        return this.answer === this.correctAnswer
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
        return this.answer === this.task.correctAnswer
    }
}

export class SumTaskFactory extends TaskFactory{
    createTask() {
        let a = rand(0, 10)
        let b = rand(0, 10)
        let res = a+b
        return new ArythmeticsTaskDef(`${a} + ${b}`, res.toString())
    }
}

function rand(min, max){
    return Math.floor((Math.random() * (min + max)) + min);
}