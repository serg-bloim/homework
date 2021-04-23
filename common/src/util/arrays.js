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