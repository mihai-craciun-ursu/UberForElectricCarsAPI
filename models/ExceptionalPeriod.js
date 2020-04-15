const mongoose = require("mongoose");

const ExceptionalPeriod  = mongoose.model(
  "ExceptionalPeriod ",
  new mongoose.Schema({
    period_begin:{
        required : true,
        type: String //DateTime string(19) 2015-06-29T20:39:09
    },
    period_end: {
        required : true,
        type: String //DateTime string(19) 2015-06-29T20:39:09
    }
},
{
    timestamps: true
}
));

module.exports =ExceptionalPeriod ;