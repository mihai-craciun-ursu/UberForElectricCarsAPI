const { Schema, model } = require("mongoose");

const verificationCodeSchema = new Schema(
  {
    email:{
      required: true,
      type: String
    },
    code: {
      required: true,
      type: String
    },
    expire_at: {type: Date, default: Date.now, expires: 600} 
  },
  {
    timestamps: true
  }
);

const VerificationCode = model("verificationCode", verificationCodeSchema);


module.exports = VerificationCode;