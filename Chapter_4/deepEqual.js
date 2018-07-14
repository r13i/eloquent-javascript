
/**
 * Compares two entities (Strings, Numbers, ..., but no functions) and is mainly made for objects
 * since they have most likely several levels of intrication.
 */
function deepEqual (a, b) {
    // For String, Number, Boolean
    if (a === b) return true;
    // For functions, undefined, null
    if (a == null || b == null || typeof a != "object" || typeof b != "object") return false;

    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    
    if (aKeys.length != bKeys.length) return false;
    for (let key of aKeys) if (! bKeys.includes(key) || ! deepEqual(a[key], b[key])) return false;
    return true;
}


// Some examples
let a = {
    x: 1,
    y: 2,
    z: {
        xx: 65,
        yy: true,
        zz: {
            xxx: "str",
            yyy: true
        }
    }
}

let b = {
    z: 3,
}

let c = {
    x: 1,
    y: 2,
    z: {
        xx: 65,
        yy: true,
        zz: {
            xxx: "str",
            yyy: true
        }
    }
}

console.log(deepEqual(a, b));
console.log(deepEqual(a, c));
