exports.getDate = function() {
    let today = new Date();
    let options = { weekday: "long", day: "numeric", month: "long" };
    return day = today.toLocaleDateString("en-US", options);
}

exports.getDay = function() {
    let today = new Date();
    let options = { weekday: "long" };
    return day = today.toLocaleDateString("en-US", options);
}
console.log(exports);

// module.exports.getDate = getDate;

// function getDate() {

//     let today = new Date();
//     let options = { weekday: "long", day: "numeric", month: "long" };

//     let day = today.toLocaleDateString("en-US", options);

//     return day;
// }

// module.exports.getDay = getDay;

// function getDay() {

//     let today = new Date();
//     let options = { weekday: "long" };

//     let day = today.toLocaleDateString("en-US", options);
//     return day;
// }
// console.log(module.exports);