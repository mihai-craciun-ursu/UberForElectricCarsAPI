const mongoose = require("mongoose");

const Hours  = mongoose.model(
  "Hours ",
  new mongoose.Schema({
    twentyfourseven: {
        required : true,
        type:Boolean
    },
    regular_hours:[{
     type:mongoose.Schema.Types.ObjectId,
     ref: "RegularHours"
    }],
    exceptional_openings: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: "ExceptionalPeriod"
    }],
    exceptional_closings: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: "ExceptionalPeriod"
    }]
},
{
    timestamps: true
}
));

module.exports =Hours ;