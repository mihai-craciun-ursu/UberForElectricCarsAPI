const User= require("./user");
const Admin = require("./admin");
const Car = require("./car");
const ChargingStation = require("./chargingStation");

const Reviews = require("./reviews");
const Reports = require("./report");
const Comments = require("./comment");
const Grades = require("./grades");

const ConsumerHistory = require("./consumerHistory");
const ProviderHistory = require("./providerHistory");

const Payment = require("./payment");
const RouteLog = require("./routeLog");
const RouteRequest = require("./routeRequest");

const VerificationCode = require("./verificationCode");

module.exports = {
    User,
    Admin,
    Car,
    ChargingStation,
    Reviews,
    Reports,
    Comments,
    Grades,
    ConsumerHistory,
    ProviderHistory,
    Payment,
    RouteLog,
    RouteRequest,
    VerificationCode
};
