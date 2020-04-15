const mongoose = require("mongoose");

const EnvironmentalImpact  = mongoose.model(
  "EnvironmentalImpact ",
  new mongoose.Schema({
    category: {
        required : true,
        type:String,
        enum:[//~EnvironmentalImpactCategory~
            'NUCLEAR_WASTE',
            'CARBON_DIOXIDE',
        ]
    },
    amount: {
        required : true,
        type:Number
    }
},
{
    timestamps: true
}
));

module.exports =EnvironmentalImpact ;