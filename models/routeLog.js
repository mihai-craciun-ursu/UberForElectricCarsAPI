const { Schema, model } = require("mongoose");

const routeLogSchema = new Schema(
  {
    carID: {
      required: true,
      type: String
    },
    requestID: {
      required: true,
      type: String
    },
    stationIDlist: {
      required: true,
      type: Array
    },
    startPoint: {
      required: true,
      type: String
    },
    finishPoint: {
      required: true,
      type: String
    },
    totalDistance: {
      required: true,
      type: Number
    },
    status: {
      required: true,
      type: String
    }
  },
  {
    timestamps: true
  }
);

const RouteLog = model("routeLogs", routeLogSchema);

module.exports = RouteLog;