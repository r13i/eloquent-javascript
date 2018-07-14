
require ("./scripts.js")


function characterScript (charCode) {
    for (let script of SCRIPTS) {
        if (script.ranges.some( ([from, to]) => charCode >= from && charCode < to )) return script;
    };
    return Object.assign({ name: "Not found !" }, null);
}

console.log(characterScript(55357).name);


// console.log(String.fromCharCode(55357));
// console.log(String.fromCodePoint(128052));



function countBy (items, groupName) {
    let counts = [];
    for (let item of items) {
        let name = groupName(item);
        let index = counts.findIndex(c => c.name == name)
        if (index == -1) {
            counts.push({ name: name, count: 1 });
        }
        else {
            counts[index].count++;
        }
    };
    return counts;
}

// SCRIPTS.forEach(script => {
//     console.log(script.name);
//     console.log("=".repeat(30));
//     script.ranges.forEach(([from, to]) => {
//         let alphabet = "";
//         for (let charCode = from; charCode < to; ++charCode) alphabet += String.fromCodePoint(charCode) + " ";
//         console.log(alphabet);
//         console.log("-".repeat(10));
//     });
// });

