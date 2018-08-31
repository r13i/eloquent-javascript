
// Callbacks
setTimeout (
    () => { console.log("Hello ") },
    1000
)
setTimeout (
    () => { console.log("Hello ") },
    1000
)
setTimeout (
    () => { console.log("Hello ") },
    1000
)
console.log("Notice that all these callbacks are executed (almost) simultaneously, one after another and after the 'EVENT LOOP' has looped !");


// // Next piece of code is mock to understand the use of Promises with timeout
// class Timeout extends Error {}

// function request(nest, target, type, content) {
//     return new Promise( (resolve, reject) => {
//         let done = false;

//         function attempt(n) {
//             // Next method call is mock
//             nest.send(target, type, content, (failed, value) => {
//                 // Next is the definition of the callback function to be called once the `send` is proceeded
//                 done = true;
//                 // `reject` and `resolve` can be called only once, so this makes the job
//                 // to get out of the `Promise` if the `send` is done properly
//                 if(failed) reject(failed);
//                 else resolve(value);
//             });
//             setTimeout(() => {
//                 if(done) return;
//                 else if(n < 3) attempt(n + 1);
//                 else reject(new Timeout("Timed out !"));
//             }, 250);
//         };

//         attempt(1);
//     });
// }

function doSomethingMultipleTimes(doSomethingFunction, nTimes) {
    let done = false;

    function attempt(nTimes) {
        if(nTimes < 2) done = true;
        doSomethingFunction();

        setTimeout(() => {
            if(done) return true;
            else attempt(--nTimes);
        }, 1000);
    }

    attempt(nTimes);
}

doSomethingMultipleTimes(() => { console.log("Wassup !"); }, 5);
