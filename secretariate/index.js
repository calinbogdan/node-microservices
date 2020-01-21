const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");

const Student = require("./student.model");

const app = express();
const PORT = process.env.PORT || 5014;
connect("mongodb://localhost:27017/secretariate", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors(), express.json(), express.urlencoded({
    extended: true
}));

// endpoints -->

app.get("/students", async (req, res) => {
    return res.send(await Student.find().exec());
});

// new students should only be added through the admittance process --> config cors
app.post("/students", async (req, res) => {
    const newStudent = await (new Student(req.body).save());
    return res.send(newStudent);
})

// end of endpoints

app.listen(PORT, () => {
    console.log(`Secretariate service is running on port ${PORT}`);
})