const { model, Schema } = require("mongoose");

module.exports = model("Group", {
    mnemonic: { 
        type: String, 
        required: true 
    },
    students: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Student" 
    }],
    year: { type: Number, default: 1 }
});