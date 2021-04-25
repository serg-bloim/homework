import {imgs} from "./images.js";
import fs from "fs";
import {debug} from "homework-common/src/util/basic.js";
import _ from 'lodash'
import {word2syllables} from "./syllables.js";
import dirTree from 'directory-tree'
import parseUrl from 'parse-url'
import path from "path";

let registeredFilenames = imgs.map(it => parseUrl(it.url).pathname).map(p => path.basename(p))
let img_files = dirTree('../data/img').children.filter(f => f.type === 'file').map(f => f.name);
let unregisteredFiles = img_files.filter(f => !registeredFilenames.includes(f))

let str = unregisteredFiles.map(f=>` {
    url: "https://raw.githubusercontent.com/serg-bloim/homework/master/data/img/${f}",
    attrs: {name_ru: "???"}
},`).join("")
console.log(str)