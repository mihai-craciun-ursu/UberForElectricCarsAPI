const mongoose = require("mongoose");

const BusinessDetails = mongoose.model(
  "BusinessDetails",
  new mongoose.Schema({
    name: {
        required : true,
        type:String //string(100)
    },
    website: {
        required : true,
        type: String //URL: string(255) following the w3.org spec
    },
    logo:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Image"
    }
},
{
    timestamps: true
}
));

module.exports =BusinessDetails;