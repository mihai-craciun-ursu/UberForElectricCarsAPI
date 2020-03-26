const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.use(morgan("tiny"));

const ENV = process.env.NODE_ENV || 'dev';

const config = dotenv.config({
    path: `./configs/${ENV}.env`
}).parsed;

mongoose.connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Succesfully connected to DB"));

const db = require("./models");

app.use((req, res, next) => {
    req.db = db;
    next();
});

app.listen(config.PORT, () => {
    console.log(`listening to port ${config.PORT}...`);
});
