const { Schema, model } = require("mongoose");

const carSchema = new Schema(
    {
        userID: {
            required: true,
            type: String
        },
        model: {
            required: true,
            type: String
        },
        yearOfFabrication: {
            required: true,
            type: Number
        },
        plugType: {
            required: true,
            type: String
        },
        batteryCapacity: {
            required: true,
            type: Number
        },
        averageConsumpion: {
            required: true,
            type: Number
        },
        licencePlate: {
            required: true,
            type: String
        }
    },
    {
        timestamps: true
    }
);

const Car = model("cars", carSchema);

module.exports = Car;