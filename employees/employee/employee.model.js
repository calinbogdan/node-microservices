const { model } = require("mongoose");

module.exports = model("Employee", {
    firstName: String,
    lastName: String,
    birthDate: Date,
    startedWorkingOn: Date
})