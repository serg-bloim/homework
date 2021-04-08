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
        let answr = undefined
        if(this.answer) {
            answr = this.answer
        }
        return this.preview(answr)
    }

    is_correct() {
        return this.answer === this.correctAnswer
    }
}

export class SumTaskFactory extends TaskFactory{
    limit = 15;
    constructor(limit = 10) {
        super();
        this.limit = limit;
    }
    createTask() {
        let a = rand(0, this.limit)
        let b = rand(0, this.limit)
        let res = a+b
        return new ArythmeticsTaskDef(`${a} + ${b}`, res.toString())
    }
}

function rand(min, max){
    return Math.floor((Math.random() * (min + max)) + min);
}