const { Schema, model } = require("mongoose");

const reviewsSchema = new Schema(
  {
    stationID: {
      required: true,
      type: String
    },
    comments: {
      type: Array
    },
    grades: {
      type: Array
    },
    reports: {
      type: Array
    }
  },
  {
    timestamps: true
  }
);

const reviews = model("reviews", reviewsSchema);

module.exports = reviews;