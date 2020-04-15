const mongoose = require("mongoose");

const AdditionalGeoLocation = mongoose.model(
  "AdditionalGeoLocation",
  new mongoose.Schema({
    latitude: {//Example: 50.770774. Decimal separator: "." Regex: -?[0-9]{1,2}\.[0-9]{5,7}
        required : true,
        type:String//string(10)
    },
    longitude: {// Example: -126.104965. Decimal separator: "." Regex: -?[0-9]{1,3}\.[0-9]{5,7}
        required : true,
        type:String //string(11)
    },
    name:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "DisplayText"
    }
},
{
    timestamps: true
}
));

module.exports =AdditionalGeoLocation;