"use strict"

async function myAsyncFunction () {
    try {
        let result = await Promise.reject("Some fancy value");
        console.log(result);
    } catch (error) {
        console.log(new Error("Failed !"));
    }
}

myAsyncFunction();
