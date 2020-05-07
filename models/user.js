const { Schema, model } = require("mongoose");

const userSchema = new Schema(
{
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    phoneNumber: {
        required: true,
        type: String
    },
    listOfCars: {
        type: Array
    },
    listOfChargingStations: {
        type: Array
    },
    paypalEmail: {
        type: String
    },
    address: {
        type: String
    },
    confirmationStatus: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
}
);

const User = model("users", userSchema);

module.exports = User;