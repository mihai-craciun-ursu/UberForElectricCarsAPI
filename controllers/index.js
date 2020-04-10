const authController = require("./authController");
const userController = require("./userController");
const carController = require("./carController");
const stationController = require("./stationController");

const chargetrip = require("./chargetrip");

module.exports = {
    authController,
    userController,
    carController,
    stationController,
    chargetrip
}