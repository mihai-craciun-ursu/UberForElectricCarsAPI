
const HttpStatusCodes = require("http-status-codes");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const chargeTrip = require("./chargetrip");

const VerificationCode = require('../models').VerificationCode;
const Admin = require('../models').Admin;
const Location = require("../models").Location;
const TempLocation = require("../models").TempLoacation;
const GeoLocation = require("../models").GeoLocation;
const EVSE = require("../models").EVSE;
const Connector = require("../models").Connector;


const approveLocationRequest = async (req,res) =>{
    try{

        const userId = req.user._id;
        const userData = await req.db.Admin.findOne({
            _id: userId
        });

        const id = req.body.id;
        const station = req.db.TempLocation.findOne(
            {
                _id: id
            }
        );

        const aprovedStationObj = new Location({
            evses: station.arrayOfEvses,
            charging_when_closed: true,
            country_code: "RO",
            party_id: "AAA",
            publish: false,
            address: station.address, //String
            city: station.city, //string
            country: "RO",
            coordinates: station.coordintes,
            time_zone: "europe/bucharest",
            last_updated: new Date().toISOString(),
            user: station.user,
            price_per_kw: station.price_per_kw //Float
        });

        const aprovedStation = await req.db.Location.create(aprovedStationObj);

        return res.status(HttpStatusCodes.OK).json({
            success: true
        });
    }catch(err){
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something bad happen!"
        });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        const user = await req.db.Admin.findOne({
          email
        });
    
        if (!user) {
          return res.status(HttpStatusCodes.NOT_FOUND).json({
            success: false,
            message: "Email or password incorrect"
          });
        }
  
        //check if password is correct
        const validPass = await bcrypt.compare(password, user.password);
  
        if(!validPass) {
          return res.status(HttpStatusCodes.NOT_FOUND).json({
            success: false,
            message: "Email or password incorrect"
          });
        }
  
        //Create and assign a token
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET_ADMIN);
        res.header('Auth-Token', token);
  
  
        const authToken = new AuthToken({
          token: token,
          email: email
        });
        const at = await req.db.AuthToken.create(authToken);
  
        return res.status(HttpStatusCodes.OK).json({
          success: true
        });
      } catch (error) {
        console.error(error);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "Something bad happen!"
        });
      }
}

const register = async (req, res) => {
    //Check if the user is already in the database. If not send 409 Conflict and reject request
    try {
      const existingUser = await req.db.Admin.findOne({
        email: req.body.email
      })
  
      if (existingUser) {
        return res.status(HttpStatusCodes.CONFLICT).json({
          success: false,
          message: "User already exists!"
        })
      }

      //Hash passwords
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      //Create a new User using given data from Mobile or Web App
      const createdUser = new Admin({
        email: req.body.email,
        password: hashPassword
      });
  
      const user = await req.db.Admin.create(createdUser);
  
      return res.status(HttpStatusCodes.CREATED).json({
        success: true
      })
    } catch (error) {
      console.error(error);
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Something bad happened!"
      });
    }
  };

module.exports = {
    approveLocationRequest,
    login,
    register
}