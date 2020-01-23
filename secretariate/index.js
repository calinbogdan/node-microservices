const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");

const Student = require("./student.model");
const Group = require("./group.model");

const AdmittanceService = require("./admittance.service");

const app = express();
const PORT = process.env.PORT || 5014;
connect("mongodb://127.0.0.1:27017/secretariate", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors(), express.json(), express.urlencoded({
    extended: true
}));

app.get("/students", async (req, res) => {
    return res.send(await Student.find().exec());
});

// new students should only be added through the admittance process --> config cors
app.post("/students", async (req, res) => {
    const newStudent = await (new Student(req.body).save());
    return res.send(newStudent);
});

app.get("/groups", async (req, res) => {
    res.send(await Group.find()
        .populate("students")
        .lean()
        .exec());
});

app.get("/groups/:id", (req, res) => {
    Group.findById(req.params.id)
        .populate("students")
        .lean()
        .exec()
        .then(res.send)
        .catch(error => res.status(404).send(error));
});

app.get("/groups/:id/students", async (req, res) => {
    const groupsWithStudents = await Group.findById(req.params.id)
            .populate("students")
            .lean()
            .exec();
});

app.post("/groups", async (req, res) => {
    const newGroup = await (new Group(req.body).save());
    res.send(newGroup.toJSON());
});

app.listen(PORT, () => {
    console.log(`Secretariate service is running on port ${PORT}`);
})

