const HttpStatusCodes = require("http-status-codes");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const chargeTrip = require("./chargetrip");

const VerificationCode = require('../models').VerificationCode;
const User = require('../models').User;
const Location = require("../models").Location;
const TempLocation = require("../models").TempLocation;
const GeoLocation = require("../models").GeoLocation;
const EVSE = require("../models").EVSE;
const Connector = require("../models").Connector;


const getUser = async (req, res) => {
    try {

        const userId = req.user._id;

        const userData = await req.db.User.findOne({
            _id: userId
        });

        const carPromises = userData.listOfCars.map(async carId => {
            const chargeTripResp = await chargeTrip.getCarById(carId);
            return chargeTripResp;
        }) ;
        

        const promiseVector = await Promise.all(carPromises);

        let listOfCarsExpanded = [];
        promiseVector.forEach(element => {
            listOfCarsExpanded.push(element.car);
        });

        return res.status(HttpStatusCodes.OK).json({
            success: true,
            user: {
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                phoneNumber: userData.phoneNumber,
                paypalEmail: userData.paypalEmail || null,
                address: userData.address || null,
                listOfCars: listOfCarsExpanded,
                listOfChargingStations: userData.listOfChargingStations
            }
          });
    }catch(err){
        console.error(err);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something bad happen!"
        });
    }
};

const changePassword = async (req, res) => {
    try {

        const userId = req.user._id;
        

        const userData = await req.db.User.findOne({
            _id: userId
        });

        

        if(req.user.passChangeState){
            //Hash passwords
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.newPassword, salt);

            await req.db.User.findOneAndUpdate({ 
                _id: userId
            }, {
                password: hashPassword
            });

            await req.db.VerificationCode.deleteMany({ 
                email: userData.email
            });
            await req.db.AuthToken.deleteMany({ 
                email: userData.email
            });

            return res.status(HttpStatusCodes.OK).json({
                success: true
            });
        }else{

            const oldPass = req.body.oldPassword;
            const newPass = req.body.newPassword;
            const userId = req.user._id;
            
            const userData = await req.db.User.findOne({
                _id: userId
            });

            const validPass = await bcrypt.compare(oldPass, userData.password);

            if(!validPass) {
                return res.status(HttpStatusCodes.UNAUTHORIZED).json({
                success: false,
                message: "Old Password incorrect"
                });
            }

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(newPass, salt);

            await req.db.User.findOneAndUpdate({
                _id: userId
            }, {
                password: hashPassword
            });

            await req.db.AuthToken.deleteMany({ 
                email: userData.email
            });

            return res.status(HttpStatusCodes.OK).json({
                success: true
            });

        }
    }catch(err){
        console.error(err);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something bad happen!"
        });
    }
}

const addCar = async (req, res) => {
    try{
         const userId = req.user._id;
         const carId = req.carId;

        const userData = await req.db.User.findOne({
            _id: userId
        });

        userData.listOfCars.push(carId);

        await req.db.User.findOneAndUpdate({
            _id: userId
        }, {
            listOfCars: userData.listOfCars
        });

        return res.status(HttpStatusCodes.OK).json({
            success: true
        });

    }catch(err){
        console.error(err);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something bad happen!"
        });
    }
}

const addStation = async (req, res) => {
    try{

        const userId = req.user._id;
        const userData = await req.db.User.findOne({
            _id: userId
        });



        const password = req.body.password;
        const validPass = await bcrypt.compare(password, userData.password);

        if(!validPass) {
            return res.status(HttpStatusCodes.FORBIDDEN).json({
            success: false,
            message: "Password incorrect"
            });
        }


        if(!userData.paypalEmail){
            return res.status(HttpStatusCodes.FORBIDDEN).json({
                success: false,
                message: "Paypal account is not set yet. Please set your paypal account first in the profile section."
            });
        }

        const stationNumber = userData.listOfChargingStations.length;

        console.log(stationNumber);

        if(stationNumber >= 2){
            return res.status(HttpStatusCodes.NOT_ACCEPTABLE).json({
                success: false,
                message: "You cannot add more than 2 charging stations. Keep it personal not comerical."
            });
        }

        

        // var arrayOfConnectorsPromises = [];
        // var arrayOfConnectors = [];
        // req.body.connectors.forEach(connector => { //array

        //     let connectorObj = new Connector({
        //         standard: connector.standard, //string(ENUM)
        //         format: connector.format, //string(ENUM)
        //         power_type: connector.power_type, //string(ENUM)
        //         max_voltage: connector.max_voltage, //integer
        //         max_amperage: connector.max_amperage, //integer
        //         max_electric_power: connector.max_electric_power, //integer
        //         last_updated: new Date().toISOString()
        //     });

        //     arrayOfConnectorsPromises.push(req.db.Connector.create(connectorObj));
        // });

        // arrayOfConnectors = await Promise.all(arrayOfConnectorsPromises);

        // let evseObj = new EVSE({
        //     connectors: arrayOfConnectors,
        //     status: req.body.status, //string(ENUM)
        //     last_updated: new Date().toISOString()
        // });

        // let evse = await req.db.EVSE.create(evseObj);

        // var geoLocationObj = new GeoLocation({
        //     latitude: req.body.geolocation.latitude, //String
        //     longitude: req.body.geolocation.longitude, //String
        // });

        // let geoLocation = await req.db.GeoLocation.create(geoLocationObj);

        // let arrayOfEvses = [];
        // arrayOfEvses.push(evse);

        // let locationObj = new TempLocation({ //to be changed with Location
        //     evses: arrayOfEvses,
        //     charging_when_closed: true,
        //     country_code: "RO",
        //     party_id: "AAA",
        //     publish: false,
        //     address: req.body.address, //String
        //     city: req.body.city, //string
        //     country: "RO",
        //     coordinates: geoLocation,
        //     time_zone: "europe/bucharest",
        //     last_updated: new Date().toISOString(),
        //     user: userData,
        //     status: "pending", //to be deleted when added to permanent
        //     price_per_kw: req.body.price //Float
        // });

        

        // let location = await req.db.TempLocation.create(locationObj);
        

        // userData.listOfChargingStations.push(location._id);

        // await req.db.User.findOneAndUpdate({
        //     _id: userData._id
        // }, {
        //     listOfChargingStations: userData.listOfChargingStations
        // });

        return res.status(HttpStatusCodes.OK).json({
            success: true
        });
    }catch(err){
        console.log(err);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something bad happen!"
        });
    }
}

const changeDetails = async(req, res) => {
    try{

        const userId = req.user._id;
        const userData = await req.db.User.findOne({
            _id: userId
        });

        const lastName = req.body.lastName || userData.lastName;
        const firstName = req.body.firstName || userData.firstName;
        const phoneNumber = req.body.phoneNumber || userData.phoneNumber;
        const address = req.body.address || userData.address || null;
        const paypalEmail = req.body.paypalEmail || userData.paypalEmail || null;

        const newUser = await req.db.User.findOneAndUpdate({
            _id: userData._id
        },
        {
            lastName: lastName,
            firstName: firstName,
            phoneNumber: phoneNumber,
            address: address,
            paypalEmail: paypalEmail
        }
        )

        //console.log(newUser);

        res.status(HttpStatusCodes.OK).json({
            success: true,
        });

    }catch(err){
        console.log(err);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something bad happen!"
        });
    }
}

const removeCar = async (req, res) => {
    try{
        const userId = req.user._id;
        const userData = await req.db.User.findOne({
            _id: userId
        });

        let newListOfCars = userData.listOfCars;

        newListOfCars = newListOfCars.filter(e => e !== req.body.carId);

        const newUser = await req.db.User.findOneAndUpdate({
            _id: userData._id
        },
        {
            listOfCars: newListOfCars,
        });

        res.status(HttpStatusCodes.OK).json({
            success: true,
        });

    }catch(err){
        console.log(err);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something bad happen!"
        });
    }
}

const removeStation = async (req, res) => {
    try{
        const userId = req.user._id;
        const userData = await req.db.User.findOne({
            _id: userId
        });

        let newListOfChargingStations = userData.listOfChargingStations;

        newListOfChargingStations = newListOfChargingStations.filter(e => e !== req.body.stationId);

        const newUser = await req.db.User.findOneAndUpdate({
            _id: userData._id
        },
        {
            listOfChargingStations: newListOfChargingStations,
        });

        res.status(HttpStatusCodes.OK).json({
            success: true,
        });

    }catch(err){
        console.log(err);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something bad happen!"
        });
    }
}


const logout = async (req, res) => {
    try {

        const userId = req.user._id;

        const userData = await req.db.User.findOne({
            _id: userId
        });


        await req.db.AuthToken.deleteMany({ 
            email: userData.email
        });

        return res.status(HttpStatusCodes.OK).json({
            success: true
        });

    }catch(err){
        console.error(err);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something bad happen!"
        });
    }
}

module.exports = {
    getUser,
    changePassword,
    logout,
    addCar,
    addStation,
    changeDetails,
    removeCar,
    removeStation
};