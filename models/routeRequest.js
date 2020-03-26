const { Schema, model } = require("mongoose");

const routeRequestSchema = new Schema(
  {
    carID: {
      required: true,
      type: String
    },
    currentLocation: {
      required: true,
      type: String
    },
    destination: {
      required: true,
      type: String
    },
    batteryStatus: {
      required: true,
      type: Number
    },
    timeSchedule: {
      required: true,
      type: Array
    }
  },
  {
    timestamps: true
  }
);

const routeRequest = model("routeRequests", routeRequestSchema);

module.exports = routeRequest;