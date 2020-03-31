const { Schema, model } = require("mongoose");

const authTokenSchema = new Schema(
  {
    email:{
      required: true,
      type: String
    },
    token: {
      required: true,
      type: String
    },
  },
  {
    timestamps: true
  }
);

const AuthToken = model("authToken", authTokenSchema);


module.exports = AuthToken;