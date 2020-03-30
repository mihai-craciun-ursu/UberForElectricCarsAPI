const HttpStatusCodes = require("http-status-codes");
const jwt = require('jsonwebtoken');
const User = require('../models').User;
const bcrypt = require('bcryptjs');
const VerificationCode = require('../models').VerificationCode;


const getUser = async (req, res) => {
    try {

        const userId = req.user._id;

        const userData = await req.db.User.findOne({
            _id: userId
        });

        return res.status(HttpStatusCodes.OK).json({
            success: true,
            user: {
                firstName: userData.firstName,
                lastName: userData.lastName,
                listOfCars: userData.listOfCars,
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

            await req.db.User.findOneAndUpdate({ //deprecated To be modified
                _id: userId
            }, {
                password: hashPassword
            });

            return res.status(HttpStatusCodes.OK).json({
                success: true
            });
        }else{
            //TODO: Check old password, renew with new password
        }
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
    changePassword
};