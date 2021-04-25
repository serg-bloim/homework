import {imgs} from "./images.js";
import fs from "fs";
import {debug} from "homework-common/src/util/basic.js";
import _ from 'lodash'
import {word2syllables} from "./syllables.js";

let filePath = 'syllables.txt';
    let existingWords = Object.keys(word2syllables)
    let allWords = imgs.map(i => i.attrs.name_ru).map(w=>w.toLowerCase())
    let missingWords = _.difference(allWords, existingWords)
    fs.appendFile(filePath, missingWords.map(w=>w+"\n").join(""), null, r=>debug("Success"))
imgs.map(i => i.attrs.name_ru)
