const mongoose = require("mongoose");

const StatusSchedule   = mongoose.model(
  "StatusSchedule  ",
  new mongoose.Schema({
    period_begin: {
        required : true,
        type: string //DateTime string(19) 2015-06-29T20:39:09
    },
    period_end: {
        type: string //DateTime string(19) 2015-06-29T20:39:09
    },
    status: {
        required:true,
        type: String,
        enum:[//Status
            'AVAILABLE',
            'BLOCKED',
            'CHARGING',
            'INOPERATIVE',
            'OUTOFORDER',
            'PLANNED',
            'REMOVED',
            'RESERVED',
            'UNKNOWN' ]
    }
},
{
    timestamps: true
}
));

module.exports =StatusSchedule  ;