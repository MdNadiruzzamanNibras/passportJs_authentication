const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRouter = require("./router/userRouter");

const app = express();
const session = require("express-session");
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(userRouter);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/registration", (req, res) => {
  res.render("registration");
});

const DB = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.ahm0vqb.mongodb.net/passport?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(DB, {
    useUnifiedTopology: true,

    useNewUrlParser: true,
  })
  .then(() => console.log("Connect"))
  .catch((error) => {
    console.log("not connected");
  });
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
