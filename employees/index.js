const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");

const Employee = require("./employee/employee.model");

connect("mongodb://localhost:27017/employees", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const PORT = 5011;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get("/", async (req, res) => {
    res.send(await Employee.find().exec());
});

app.get("/:id", async (req, res) => {
    const employeeId = req.params.id;
    res.send(await Employee.findById(employeeId).exec());
});

app.post("/", (req, res) => {
    new Employee(req.body).save()
        .then(newEmployee => res.status(201).send(newEmployee))
        .catch(error => res.status(500).send(error));
});

app.put("/:id", async (req, res) => {
    const id = req.params.id;
    Employee.findByIdAndUpdate(id, req.body).exec()
        .then(newEmployee => res.status(201).send(newEmployee))
        .catch(error => res.status(500).send(error));
});

app.delete("/:id", (req, res) => {
    Employee.findByIdAndRemove(req.params.id).exec()
        .then(removedEmployee => res.send(removedEmployee))
        .catch(error => res.status(500).send(error));
});

app.listen(PORT, () => {
    console.log(`Employees microservice running on port ${PORT}.`);
})
