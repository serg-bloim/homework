import uuidv4 from "uuid/v4.js";
import random from "random";
import {TaskFactory} from "./TaskFactory.js";
import "homework-common/src/util/arrays.js";
import _ from 'lodash'
import {imgs} from "./images.js";
import {word2syllables} from "./syllables.js";

export class OptionsTaskFactory extends TaskFactory {
    collection = []
    optionsNum = 4
    wordSizeLimit = 4

    constructor(collection, wordSizeLimit = 4, optionsNum = 4) {
        super();
        this.collection = collection
        this.wordSizeLimit = wordSizeLimit;
        this.optionsNum = optionsNum;
    }

    create() {
        let filtered = this.collection.map((e,i)=>e.attrs.name_ru.length <= this.wordSizeLimit ? i: -1).filter(x=>x>0)
        let selectedInd = filtered[random.int(filtered.length)]
        let indices = Array.from(this.collection.keys())
        indices.swap(0, selectedInd)
        for (let i = 1; i < this.optionsNum; i++) {
            indices.swap(i, i + random.int(indices.length - i))
        }
        let optionIndices = _.shuffle(indices.slice(0, this.optionsNum))
        let correctOption = optionIndices.indexOf(selectedInd)
        let options = optionIndices.map(i=>this.collection[i].url)
        let problemWord = this.collection[selectedInd].attrs.name_ru
        let problem = word2syllables[problemWord] ?? problemWord
        problem = _.capitalize(problem)
        return {
            id: uuidv4(),
            type: "none",
            __class: "OptionsTaskDef",
            __ver: "1",
            problem,
            correctOption,
            options,
            __hash: problem,
        }
    }
}