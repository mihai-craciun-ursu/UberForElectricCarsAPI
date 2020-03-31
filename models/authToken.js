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
    lastAccessed: {
      type: Date,
      default: Date.now()
    },
    temp: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const AuthToken = model("authToken", authTokenSchema);


module.exports = AuthToken;