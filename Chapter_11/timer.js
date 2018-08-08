"use strict"

/**
 * Defines a Class Timer
 * 
 * @constructor takes the number of seconds to count down.
 */
function Timer(duration) { this._duration = duration; }
Timer.prototype.getDuration = function() { return this._duration; };
Timer.prototype.setDuration = function (newDuration) { this._duration = newDuration; };
Timer.prototype.start = function() {
    let _duration = this._duration;
    function iterOnce(nTimes) {
        if (nTimes > 0) {
            console.log(nTimes);
            setTimeout(() => iterOnce(nTimes - 1), 999);    // Set to 0.999 seconds given real processing time
            return false;
        }
        else {
            console.log(`${_duration} sec TIMEOUT ! BOOM !`);
            return true;
        }
    }
    iterOnce(this._duration);
};


// // Reimlementing with `class`
// class Timer {
//     constructor(duration) {
//         this._duration = duration;
//     }
//     start() {
//         let _duration = this._duration;
//         function iterOnce(nTimes) {
//             if (nTimes > 0) {
//                 console.log(nTimes);
//                 setTimeout(() => { iterOnce(nTimes - 1); }, 999);   // Set to 0.999 seconds given real processing time
//                 return false;
//             }
//             else {
//                 console.log(`${_duration} sec TIMEOUT ! BOOM !`);
//                 return true;
//             }
//         }
//         iterOnce(this._duration);
//     }
// }


let t = new Timer(5);
t.start();

