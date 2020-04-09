const HttpStatusCodes = require("http-status-codes");
const jwt = require('jsonwebtoken');
const User = require('../models').User;
const bcrypt = require('bcryptjs');
const VerificationCode = require('../models').VerificationCode;
const chargeTrip = require("./chargetrip");


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
    addCar
};