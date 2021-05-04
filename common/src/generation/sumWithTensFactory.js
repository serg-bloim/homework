import {SumTaskFactory} from "./sumTaskFactory.js";
import {rand} from "./common.js";

class SumWithTensFactory extends SumTaskFactory {
    create() {
        let a = rand(this.min, this.max) * 10
        let b = rand(1, 9)
        return this.render(a, b)
    }
}