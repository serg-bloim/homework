import uuidv4 from "uuid/v4.js";
import random from "random";
import {TaskFactory} from "./TaskFactory.js";
import "homework-common/src/util/arrays.js";
import _ from 'lodash'

export class OptionsTaskFactory extends TaskFactory {
    collection = [{
        url: "https://raw.githubusercontent.com/serg-bloim/homework/master/data/img/cat.png",
        attrs: {name_ru: "кот"}
    }, {
        url: "https://raw.githubusercontent.com/serg-bloim/homework/master/data/img/dog.png",
        attrs: {name_ru: "собака"}
    }, {
        url: "https://raw.githubusercontent.com/serg-bloim/homework/master/data/img/whale.png",
        attrs: {name_ru: "кит"}
    }, {
        url: "https://raw.githubusercontent.com/serg-bloim/homework/master/data/img/car.png",
        attrs: {name_ru: "машина"}
    }, {
        url: "https://raw.githubusercontent.com/serg-bloim/homework/master/data/img/elephant.png",
        attrs: {name_ru: "слон"}
    }, {
        url: "https://raw.githubusercontent.com/serg-bloim/homework/master/data/img/fence.png",
        attrs: {name_ru: "забор"}
    }, {
        url: "https://raw.githubusercontent.com/serg-bloim/homework/master/data/img/fireworks.png",
        attrs: {name_ru: "фейерверк"}
    }, {
        url: "https://raw.githubusercontent.com/serg-bloim/homework/master/data/img/fish.png",
        attrs: {name_ru: "рыба"}
    }, {
        url: "https://raw.githubusercontent.com/serg-bloim/homework/master/data/img/house.png",
        attrs: {name_ru: "дом"}
    }, {
        url: "https://raw.githubusercontent.com/serg-bloim/homework/master/data/img/ship.png",
        attrs: {name_ru: "корабль"}
    }, {
        url: "https://raw.githubusercontent.com/serg-bloim/homework/master/data/img/soup.png",
        attrs: {name_ru: "суп"}
    }, {
        url: "https://raw.githubusercontent.com/serg-bloim/homework/master/data/img/tree.png",
        attrs: {name_ru: "дерево"}
    }, {
        url: "https://raw.githubusercontent.com/serg-bloim/homework/master/data/img/window.png",
        attrs: {name_ru: "окно"}
    },
    ]
    optionsNum = 4
    wordSizeLimit = 4

    constructor(wordSizeLimit = 4, optionsNum = 4) {
        super();
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
        let problem = this.collection[selectedInd].attrs.name_ru
        return {
            id: uuidv4(),
            type: "none",
            __class: "OptionsTaskDef",
            __ver: "1",
            problem,
            correctOption,
            options,
        }
    }
}