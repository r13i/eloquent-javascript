"use strict"

// Callback handling functions with Promises
new Promise((_, reject) => { reject(new Error("Fail !")) })
    .then(value => console.log("Handler 1"))        // This callback is never called since the Promise is rejected
    .catch(reason => {
        console.log("Caught Failure " + reason);
        return "Nothing";
    })
    .then(value => console.log("Handler 2", value))

// Same goes here
let p = new Promise((resolve, reject) => {
    resolve("Some fancy value");   // Function used as source of successful promise (comment this line if you want a failing promise)
    // reject(new Error("Miserably failing")); // Function used as source of failing promise
})
    .then(value => { console.log(value); return "SUCCESS !"; })
    .catch(reason => { console.log(reason); return "FAILURE !"; })
    .then(value => console.log(`Terminated with : ${value}`));      // Catching the new promise returned by `then` or `catch`




function shineALight() {
    return new Promise((resolve, reject) => {
        // try `Promise.resolve` for fulfilled promise and `Promise.reject` for rejected promise
        Promise.resolve("May the light be !").then(fulfilledValue => resolve(fulfilledValue)).catch(rejectedValue => reject(rejectedValue))
    });
};
shineALight().then(value => console.log(`SUCCESS : ${value}`)).catch(reason => console.log(`FAILURE : ${reason}`));

// Let's define an array of promises
var promiseArray = [Promise.resolve(0), Promise.reject(1), Promise.resolve(2)];

// First, we'll see that using Promise.all will return eather an array of successes, or
// the single value that failed the whole array (switch in the array with resolve or reject)
Promise.all(promiseArray).then(
    (valueArray) => console.log(JSON.stringify(valueArray, null, 4)),
    (reasonArray) => console.log(JSON.stringify(reasonArray, null, 4))
);

// Then we'll manage to filter the array to get only the positions in the array that succeded / failed
var promiseArray = [Promise.resolve(0), Promise.resolve(1), Promise.resolve(2)];
let mappedPromises = promiseArray.map(p => p.then(() => true, () => false))

Promise.all(mappedPromises).then(result => console.log(result));


