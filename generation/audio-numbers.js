import {create_seq} from "homework-common/src/util/arrays.js";
import _ from 'lodash'

const numbers = Array.from(create_seq(1,20))
export const audioCollection = _.mapValues(
    _.keyBy(numbers, n=>n),
        n=>`https://github.com/serg-bloim/homework/raw/master/data/audio/collections/number-serg/${n}.mp3`)