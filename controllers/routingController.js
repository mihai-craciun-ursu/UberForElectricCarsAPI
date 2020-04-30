const HttpStatusCodes = require("http-status-codes");
const chargetrip = require("./chargetrip");

const getNewRoute = async (req, res) => {
    try{
        const data = await chargetrip.newRoute(req.body);

        console.log(data);
        return res.status(HttpStatusCodes.OK).json({
            success: true,
            data: data
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
    getNewRoute
  };