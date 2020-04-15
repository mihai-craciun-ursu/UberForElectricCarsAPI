const HttpStatusCodes = require("http-status-codes");
const chargetrip = require("./chargetrip");
const Location = require("../models").Location;
const GeoLocation = require("../models").GeoLocation;
const fs = require("fs");


const getListOfAllStations = async (req, res) => {
    try{

        let rawdata = fs.readFileSync(__dirname + '\\charging.json');
        let location = JSON.parse(rawdata);

        //   const geoLocation = new GeoLocation({
        //     latitude: "45.123456",
        //     longitude: "12.123456"
        // });

        // const createLocation = new Location({
        //     country_code: "RO",
        //     party_id: "Mie(persoanei mele)",
        //     publish: true,
        //     address: "ceva adresa",
        //     city: "Tulcea",
        //     country: "Romania",
        //     coordinates: await req.db.GeoLocation.create(geoLocation),
        //     time_zone: "Europe/Bucharest",
        //     charging_when_closed: true,
        //     last_updated: "2015-06-29T20:39:09"
        // });

        // const location = await req.db.Location.create(createLocation);


        return res.status(HttpStatusCodes.OK).json({
            success: true,
            data: {
                location: location
            }
          });

    }catch(err){
        console.error(err);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something bad happen!"
          });
    }
}

const getStationById = async (req, res) => {
    try{
        return res.status(HttpStatusCodes.OK).json({
            success: true,
            message: "To Be Itegrated with current OCPI Standard"
          });
    }catch(err){
        console.error(err);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something bad happen!"
          });
    }
}

const getEVSEById = async (req, res) => {
    try{
        return res.status(HttpStatusCodes.OK).json({
            success: true,
            message: "To Be Itegrated with current OCPI Standard"
          });
    }catch(err){
        console.error(err);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something bad happen!"
          });
    }
}


const getConnectorById = async (req, res) => {
    try{
        return res.status(HttpStatusCodes.OK).json({
            success: true,
            message: "To Be Itegrated with current OCPI Standard"
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
    getListOfAllStations,
    getStationById,
    getEVSEById,
    getConnectorById
  };

