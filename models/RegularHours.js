const mongoose = require("mongoose");

const RegularHours   = mongoose.model(
  "RegularHours  ",
  new mongoose.Schema({
    weekday: {
        required : true,
        type:Number
    },
    period_begin:{
        required : true,
        type: String  //string(5)
    },
    period_end: {
        required : true,
        type: String  //string(5)
    }
},
{
    timestamps: true
}
));

module.exports =RegularHours  ;