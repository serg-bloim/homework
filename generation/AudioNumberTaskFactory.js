import {TaskFactory} from "./TaskFactory.js";
import random from "random";

export class AudioNumberTaskFactory  extends TaskFactory {
    audioCollection;
    min;
    max;
    constructor(audioCollection, min, max) {
        super();
        this.audioCollection = audioCollection;
        this.min = min;
        this.max = max;
    }

    create(){
        let expected = random.int(this.min, this.max)
        let audioUrl = this.audioCollection[expected]
        let base = this.createBase("AudioMatchTaskDef", "1")
        let __hash = expected
        return { ...base, audioUrl, expected, __hash }
    }
}