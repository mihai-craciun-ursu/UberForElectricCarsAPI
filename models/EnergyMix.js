const mongoose = require("mongoose");

const EnergyMix  = mongoose.model(
  "EnergyMix ",
  new mongoose.Schema({
    is_green_energy: {
        required : true,
        type:Boolean
    },
    energy_sources:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "EnergySource"
    },
    environ_impact: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "EnvironmentalImpact"
    },
    supplier_name: {
	required: true,
        type:String//string(64)
    },
    energy_product_name:{
	required: true,
        type:String//string(64)
    }
},
{
    timestamps: true
}
));

module.exports =EnergyMix ;