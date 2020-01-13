const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");
const { sign } = require("jsonwebtoken");

const User = require("./model/user");

const JWT_SECRET = "124f1f1ufF!Fg1";
const PORT = 5010;

connect("mongodb://localhost:27017/auth", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const addUserAsync = (user) => new User(user).save();

const asUserToken = ({ firstName, lastName, email }) => ({ firstName, lastName, email });

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
    extended: true
}));

app.get("/", async (req, res) => {
    const users = await User.find().exec();
    res.send(users);
});

app.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id).exec();
    res.send(user);
});

app.post("/", (req, res) => 
    addUserAsync(req.body)
        .then(newUser => res.status(201).send(newUser))
        .catch(error => res.status(500).send(error))
);

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password }).lean().exec();

    if (user) {
        return res.status(200).send(sign(asUserToken(user), JWT_SECRET));
    }
    return res.sendStatus(401);
});

app.post("/register", async (req, res) => {
    const newUser = await addUserAsync(req.body);

    return res.status(200).send(sign(asUserToken(newUser), JWT_SECRET));
});

app.listen(PORT, () => {
    console.log(`Auth microservice started on port ${PORT}`);
});