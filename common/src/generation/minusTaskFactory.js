import {TaskFactory} from "./TaskFactory.js";
import {rand, renderArythmeticTask} from "./common.js";

export class MinusTaskFactory extends TaskFactory {
    min = 0;
    max;

    constructor(limit1, limit2) {
        super();
        if (limit2) {
            this.min = limit1
            this.max = limit2
        } else {
            this.max = limit1
        }
    }

    create() {
        let a = rand(this.min, this.max)
        let b = rand(1, a)
        let correctAnswer = a - b;
        let problem = `${a} - ${b}`;
        return renderArythmeticTask(problem, correctAnswer)
    }
}