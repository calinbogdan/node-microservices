const express = require("express");
const { connect } = require("mongoose");

const Candidate = require("./candidate.model");

connect("mongodb://localhost:27017/admittance", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
const PORT = process.env.PORT || 5015;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

/**
 * Returns the candidates ordered descending by grade.
 */
app.get("/candidates", async (req, res) => {
    res.send(await Candidate.find()
        .sort({ grade: "desc" })
        .lean()
        .exec());
});

/**
 * Adds a new candidate to the database.
 */
app.post("/candidates", async (req, res) => {
    const candidate = new Candidate(req.body);
    res.send(await candidate.save());
});

app.listen(PORT, () => {
    console.log(`Admittance microservice is now running on port ${PORT}!`);
})