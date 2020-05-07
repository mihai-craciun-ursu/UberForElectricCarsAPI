const authController = require("./authController");
const userController = require("./userController");
const carController = require("./carController");
const stationController = require("./stationController");
const chargingStationController = require("./chargingStationController");
const routingController = require("./routingController");
const paymentController = require("./paymentController");

const chargetrip = require("./chargetrip");

module.exports = {
    authController,
    userController,
    carController,
    stationController,
    chargingStationController,
    routingController,
    paymentController,
    chargetrip
}