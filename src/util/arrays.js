/**
 * @template T
 *
 * @param len
 * @param func {function(number):T}
 * @return {T[]}
 */
export function create_array(len, func) {
    let arr = [];
    for(let i =0 ; i < len; i++){
        arr.push(func(i))
    }
    return arr;
}