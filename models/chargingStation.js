const { Schema, model } = require("mongoose");

const chargingStationSchema = new Schema(
{
    ownerID: {
        required: true,
        type: String,
    },
    location: {
        required: true,
        type: String
    },
    chargingType: {
        required: true,
        type: String // type will be object. To be modified after
    },
    pricePerKWH: {
        required: true,
        type: Number
    },
    schedule: {
        from: {
            required: true,
            type: String
        },
        to: {
            required: true,
            type: String
        }
    },
    availability: {
        type: Boolean
    },
    payingMethod: {
        type: Array
    },
    otherFacilities: {
        type: Array
    }
},
{
    timestamps: true
}
);

const ChargingStation = model("chargingStations", chargingStationSchema);

module.exports = ChargingStation;