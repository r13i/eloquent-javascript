"use strict";

// let dateTime = /\d{1,2}-\d{1,2}-\d{2,4} \d{1,2}:\d{2}/;
let dateTime = /[0-9]{1,2}-[0-9]{1,2}-[0-9]{2,4} [0-9]{1,2}:[0-9]{2}/;
console.log(dateTime.test("7-7-2018 1:08"));

let neighborhood = /neighbou?r/;        // Means the 'u' may occur 0 or 1 time
console.log(neighborhood.test("neighbours"));
console.log(neighborhood.test("neighbors"));

let phantomCry = /boo+(hoo+)+/i;
console.log(phantomCry.test("Boooohoooooooooohoo !"));

///////////////////////////////////////////////////////////////////////////////////////////////////

function getDate(str) {
    let [_, day, month, year, __, hours, minutes, ___, seconds] = /^(\d{1,2})-(\d{1,2})-(\d{4})( (\d{1,2}):(\d{1,2})(:(\d{1,2}))?)?$/.exec(str);
    return new Date(year, month - 1, day, hours||0, minutes||0, seconds||0);
}

console.log("\n");
console.log("Working with Date instances :");
console.log(getDate("14-7-2018"));
console.log(getDate("14-7-2018 1:19"));
console.log(getDate("14-7-2018 1:19:08"));

///////////////////////////////////////////////////////////////////////////////////////////////////

let animalCount = /\b\d+ (pig|cow|chicken)s?\b/;
console.log("\n");
console.log("Working with pipes | :");
console.log(animalCount.test("1 cow"));
console.log(animalCount.test("15 chickens"));
console.log(animalCount.test("1 pigchickens"));

///////////////////////////////////////////////////////////////////////////////////////////////////

let baseNumber = /\b([01]+b|[\da-f]+h|\d+)\b/i;
console.log("\n");
console.log("Working with hex and binary numbers");
console.log("Is '011000101b' a number ?", baseNumber.test("011000101b"))
console.log("Is 'FA08h' a number ?", baseNumber.test("FA08h"));
console.log("Is '123' a number ?", baseNumber.test("123"))

///////////////////////////////////////////////////////////////////////////////////////////////////

let str = "Borobudur";
let newStr = str.replace(/[ou]/g, "a");

console.log("\n");
console.log("Working with Global RegExp :");
console.log(str);
console.log(newStr);

///////////////////////////////////////////////////////////////////////////////////////////////////

let swapNames = function (str) {
    let names = /(\w+), (\w+)/g;
    return str.replace(names, "$2 $1");
}

console.log("\n");
console.log("Working with swaping :");
console.log(swapNames("Bond, James\nBoualem, Hamoud\nBenamor, Amor"));

///////////////////////////////////////////////////////////////////////////////////////////////////

function minusOne(match, amount, unit) {
    amount = Number(amount) - 1;
    if (amount == 1) {
        unit = unit.slice(0, unit.length - 1);
    } else if (amount == 0) {
        amount = "no";
    }
    return amount + " " + unit;
}

let inventary = "1 lemon, 30 eggs, 2 chickens";
let newInventory = inventary.replace(/\b(\d+) (\w+)\b/g, minusOne);

console.log("\n");
console.log("Working with Invetories :");
console.log(newInventory);

///////////////////////////////////////////////////////////////////////////////////////////////////

let stripComments = function(pieceOfCode) {
    let commentPattern = /\/\/.*|\/\*[^]*?\*\//g;
    return pieceOfCode.replace(commentPattern, "");
}

console.log("\n");
console.log("Working with Striping comments :");
console.log(stripComments("let a = 1;   //That's all folks !"));
console.log(stripComments("a /* That's a */+ b /*That's b*/= c;//And that's c"));

///////////////////////////////////////////////////////////////////////////////////////////////////

// PARSE INI //

console.log("\n");
console.log("Parsing an INI file :");

function parseINI (text) {
    let result = Object.create(null);
    let section = result;

    text.split(/\r?\n/).forEach( line => {
        let match;

        if (match = /^(\w+) *= *(.*)$/.exec(line)) {
            section[match[1]] = match[2];
        } else if (match = /^\[(.*)\]$/.exec(line)) {
            result[match[1]] = section = {};
        } else if (! /^\s*(;.*)?$/.test(line)) {
            throw Error(`Line '${line}' is not valid.`);
        }
    });

    return result;
}

// console.log(JSON.stringify(parseINI(`
// name=Vasilis
// [address]
// city = Tessaloniki
// `), null, 4));

console.log(JSON.stringify(parseINI(`
searchengine=https://duckduckgo.com/?q=$1
spitefulness=9.7

; comments are preceded by a semicolon...
; each section concerns an individual enemy

[larry]
fullname=Larry Doe
type=kindergarten bully
website=http://www.geocities.com/CapeCanaveral/11451

[davaeorn]
fullname=Davaeorn
type=evil wizard
outputdir=/home/marijn/enemies/davaeorn
`), null, 4));