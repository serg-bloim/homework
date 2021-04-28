import {TaskFactory} from "./TaskFactory.js";
import random from "random";

export class AudioNumberTaskFactory  extends TaskFactory {
    min;
    max;
    constructor(audioCollection, min, max) {
        super();
        this.min = min;
        this.max = max;
    }

    create(){
        let base = this.createBase("AudioMatchTaskDef", "1")
        let expected = random.int(this.min, this.max)
        let __hash = expected
        return { ...base, expected, __hash }
    }
}