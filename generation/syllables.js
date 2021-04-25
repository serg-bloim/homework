import fs from 'fs'
import _ from 'lodash'

let syllables = fs.readFileSync("syllables.txt").toString()
    .split(/\r?\n/)
    .filter(w=>w.length > 0)
    .map(w=>w.toLowerCase());

export const word2syllables = _.keyBy(syllables, w=>w.replaceAll('-', ''))