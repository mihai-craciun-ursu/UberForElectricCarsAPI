const mongoose = require("mongoose");

const EnergySource  = mongoose.model(
  "EnergySource ",
  new mongoose.Schema({
    source: {
        required : true,
        type:String,
        enum:[//~EnergySourceCategory~
            'NUCLEAR',
            'GENERAL_FOSSIL',
            'COAL',
            'GAS',
            'GENERAL_GREEN',
            'SOLAR',
            'WIND',
            'WATER'
        ]
    },
    percentage: {
        required : true,
        type:Number//BETWEEN 0-100
    }
},
{
    timestamps: true
}
));

module.exports =EnergySource ;