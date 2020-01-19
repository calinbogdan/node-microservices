const { model, Schema } = require("mongoose");

module.exports =  model("Candidate", {
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    grade: {
        type: Number,
        required: true
    }
});