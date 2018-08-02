// "use strict";

// // Declare some package holding week days
// const weekDay = function () {
//     const names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//     return {
//         name(number) { return names[number]; },
//         number(name) { return names.indexOf(name); }
//     };
// }();

// // Notice that weekDay is not a function, but the object returned by the function call
// console.log(weekDay.number("Sunday"));
// console.log(weekDay.name(0));

// // Running a piece of code using EVAL
// const x = 1;
// function evalAndReturnX (code) {
//     eval(code);
//     return x;
// }

// console.log(evalAndReturnX("var x = 2;"));
// console.log(x);

// // Constructing functions using the Function constructor
// let plusOne = Function ("arg1", "return arg1 + 1;");
// console.log(plusOne(5));


// Exporting the newly created module from file 'format-date.js'
let {formatDate} = require("./format-date");
console.log(formatDate(new Date(), "dddd the Do"));

// Exporting the ECMAScript way
// import formatDateEcma from "./format-date-ecma";
// console.log(formatDateEcma(new Date(), "dddd th Do"));