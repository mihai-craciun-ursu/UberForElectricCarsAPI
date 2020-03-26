const { Schema, model } = require("mongoose");

const gradesSchema = new Schema(
  {
    reviewID: {
      required: true,
      type: String
    },
    userID: {
      required: true,
      type: String
    },
    grade: {
      required: true,
      type: Number
    }
  },
  {
    timestamps: true
  }
);

const Grades = model("grades", gradesSchema);

module.exports = Grades;