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

const Reviews = model("reviews", reviewsSchema);

module.exports = Reviews;