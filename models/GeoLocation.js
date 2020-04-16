const mongoose = require("mongoose");

const GeoLocation  = mongoose.model(
  "GeoLocation",
  new mongoose.Schema({
    latitude: {
        required : true,
        type:String //string(10)
        // Example: 50.770774. Decimal separator: "." Regex: -?[0-9]{1,2}\.[0-9]{5,7}
    },
    longitude: {
        required : true,
        type:String//string(11)
         //Example: -126.104965. Decimal separator: "." Regex: -?[0-9]{1,3}\.[0-9]{5,7}
    }
},
{
    timestamps: true
}
));

module.exports =GeoLocation ;