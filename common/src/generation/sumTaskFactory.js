import {TaskFactory} from "./TaskFactory.js";
import {rand, renderArythmeticTask} from "./common.js";

export class SumTaskFactory extends TaskFactory {
    min = 0;
    max;

    constructor(min, max) {
        super();
        this.min = min
        this.max = max
    }

    create() {
        let res = rand(this.min, this.max)
        let a = rand(1, res - 1)
        let b = res - a
        return this.render(a, b);
    }

    render(a, b) {
        let correctAnswer = a + b;
        let problem = `${a} + ${b}`;
        return renderArythmeticTask(problem, correctAnswer);
    }
}