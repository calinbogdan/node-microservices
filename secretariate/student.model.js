const { model } = require("mongoose");

module.exports = model("Student", {
    firstName: String,
    lastName: String,
    year: { type: Number, default: 1 }
})