const express = require("express");
const { connect, Types: { ObjectId } } = require("mongoose");

const Candidate = require("./candidate.model");
const Session = require("./session.model");

connect("mongodb://127.0.0.1:27017/admittance", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

console.log(process.env.HOST_PORT);

const app = express();
const PORT = process.env.PORT || 5015;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

/**
 * Returns the candidates ordered descending by grade.
 */
app.get("/sessions/:id/candidates", async (req, res) => {
    if (!req.params.id) {
        return res.status(400).send("ERROR: Parameter 'id' not specified.");
    }

    const sessionId = req.params.id;
    return Session.findById(sessionId).orFail()
            .populate("candidates")
            .lean()
            .map(session => session.candidates)
            .exec()
            .then(candidates => res.send(candidates))
            .catch(() => res.status(404).send(`There is no admittance session with given sessionId: ${sessionId}.`));
});

/**
 * Adds a new candidate to the database.
 */
app.post("/sessions/:id/candidates", async (req, res) => {

    // TODO can add candidate if the said session hasn't ended
    if (!req.params.id) {
        return res.status(400).send("ERROR: Parameter 'id' not specified.");
    }

    const candidate = await (new Candidate(req.body).save());

    await Session.findByIdAndUpdate(req.params.id, {
        $push: {
            candidates: ObjectId(candidate._id)
        }
    }).exec();

    res.send(candidate);

});

app.post("/sessions", async (req, res) => {
    const session = new Session(req.body);
    res.send(await session.save());
});

app.listen(PORT, () => {
    console.log(`Admittance microservice is now running on port ${PORT}!`);
})