import _ from 'lodash'
/**
 * @template T
 *
 * @param len
 * @param func {function(number):T}
 * @return {T[]}
 */
export function create_array(len, func) {
    let arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(func(i))
    }
    return arr;
}

export function* create_seq(start, len) {
    for (let i = 0; i < len; i++) {
        yield start + i
    }
}

export function* next_array_key(start, len) {
    for (let i = 0; i < len; i++) {
        yield (start + i) % len
    }
}


export function swap(arr, a, b) {
    if(a < arr.length && b < arr.length){
        let buffer = arr[a]
        arr[a] = arr[b]
        arr[b] = buffer
        return true
    }
    return false
}


/**
 * @param {(e)=>Boolean} predicate
 */
Array.prototype.count = function(predicate){
    let res = 0;
    for(const e of this){
        if(predicate(e)){
            res++
        }
    }
    return res
}


Array.prototype.swap = function(a, b){
    if(a < this.length && b < this.length){
        let buffer = this[a]
        this[a] = this[b]
        this[b] = buffer
        return true
    }
    return false
}


Array.prototype.groupBy = function (keyF) {
    return _.groupBy(this, keyF)
}

Array.prototype.sortBy = function (keyF, sortedKeys) {
    if(sortedKeys){
        return _.sortBy(this, a=>sortedKeys.indexOf(keyF(a)))
    }
    return _.groupBy(this, keyF)
}

Array.prototype.last = function () {
    return this[this.length-1]
}

Array.prototype.takeUntil = function (predicate){
    let newArr = []
    for(let e of this){
        newArr.push(e)
        if (predicate(e)) {
            break
        }
    }
    return newArr
}