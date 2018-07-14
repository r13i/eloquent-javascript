
/**
 * Transforms an array of elements to a list
 * 
 * @param {Array} arr An array of elements
 * @returns {Object}
 */
function array2list (arr) {
    let list = null;
    for (let idx = arr.length - 1; idx >= 0; --idx) {
        list = {value: arr[idx], next: list};
    }
    return list;
}

/**
 * Transforms a list to an array
 * 
 * @param {Object} list The list to transform
 * @returns {Array}
 */
function list2array (list) {
    let array = [];
    for (let elem = list; list; list = list.next) array.push(list.value);
    return array;
}


let arr = [1, 2, 3];
let lst = array2list(arr);

console.log(list2array(lst));
