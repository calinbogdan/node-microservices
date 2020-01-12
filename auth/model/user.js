const { model } = require("mongoose");

module.exports = model("User", {
    firstName: String,
    lastName: String,
    email: String,
    password: String
});