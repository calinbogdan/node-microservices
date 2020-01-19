const { model, Schema } = require("mongoose");

module.exports = model("Session", {
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    candidates: [{ type: Schema.Types.ObjectId, ref: "Candidate" }]
});
