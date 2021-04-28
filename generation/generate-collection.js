import path from "path";
import dirTree from "directory-tree";
import {debug} from "homework-common/src/util/basic.js";
import _ from 'lodash'
import fs from "fs";

let rootPath = '/Users/sbilon426/projects/homework/data/audio/collections/number-serg';
let collectionName = 'serg'
let files = dirTree(rootPath, {extensions: /\.mp3/, types: 'file'}).children.filter(e => e.type === 'file')
// debug(files)
files.forEach(e => e.basename = path.basename(e.path, e.extension))
let collection = _.mapValues(_.keyBy(files, e => e.basename), e => path.relative(rootPath, e.path))
debug(collection)

fs.writeFileSync(path.join(rootPath, collectionName+".json"), JSON.stringify(collection, null, 2))

