const HttpStatusCodes = require("http-status-codes");
const chargetrip = require("./chargetrip");


const getListOfAllStations = async (req, res) => {
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