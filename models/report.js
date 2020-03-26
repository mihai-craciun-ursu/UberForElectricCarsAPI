const { Schema, model } = require("mongoose");

const reportsSchema = new Schema(
  {
    reviewID: {
      required: true,
      type: String
    },
    userID: {
      required: true,
      type: String
    },
    message: {
      required: true,
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Reports = model("reports", reportsSchema);

module.exports = Reports;