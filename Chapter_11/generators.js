"use strict"


function* powersOf (n, max) {
    for (let current = n; current <= max; current *= n) {
        yield current;
    }

    return "DONE !";
}

for (let power of powersOf(3, 100)) {
    console.log(power);
}