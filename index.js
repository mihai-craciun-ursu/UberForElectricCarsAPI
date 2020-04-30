const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const schedule = require('node-schedule');
var cors = require('cors');

const AuthToken = require('./models').AuthToken;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.use(morgan("tiny"));

const ENV = process.env.NODE_ENV || 'dev';

const config = dotenv.config({
    path: `./configs/${ENV}.env`
}).parsed;

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify: false
}).then(() => console.log("Succesfully connected to DB"));

const db = require("./models");

app.use(cors({origin: '*', allowedHeaders : ['Auth-Token','Refresh-Token'], exposedHeaders : ['Auth-Token','Refresh-Token'], methods : "GET,PUT,PATCH,POST,DELETE"}));

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
            if(Date.now() - authToken.createdAt.getTime() > (1000 * 60 * 60 * 3)){
                await db.AuthToken.findByIdAndDelete({ 
                    _id: authToken._id
                });
            }else if(Date.now() - authToken.createdAt.getTime() > (1000 * 60 * 10) && authToken.temp){
                await db.AuthToken.findByIdAndDelete({ 
                    _id: authToken._id
                });
            }
        }
    }catch(err){
        console.error(err);
    }
});


app.listen(process.env.PORT, () => {
    console.log(`listening to port ${process.env.PORT}...`);
});
