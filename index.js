const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const schedule = require('node-schedule');

const AuthToken = require('./models').AuthToken;

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
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify: false
}).then(() => console.log("Succesfully connected to DB"));

const db = require("./models");

app.use((req, res, next) => {
    req.db = db;
    next();
});

const router = require("./routes");

app.use("/", router);

//Scheduled JOBS
var deleteTokes = schedule.scheduleJob('*/5 * * * *', async() => {
    try{
        const cursor = AuthToken.find().cursor();
        console.log("AutoSchedule job. Searching for old tokens")
        for (let authToken = await cursor.next(); authToken != null; authToken = await cursor.next()) {
            if(Date.now() - authToken.updatedAt.getTime() > (1000 * 60 * 60 * 24)){
                await db.AuthToken.findByIdAndDelete({ 
                    _id: authToken._id
                });
            }
        }
    }catch(err){
        console.error(err);
    }
});


app.listen(config.PORT, () => {
    console.log(`listening to port ${config.PORT}...`);
});
