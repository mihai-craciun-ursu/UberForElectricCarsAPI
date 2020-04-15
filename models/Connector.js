const mongoose = require("mongoose");

const Connector  = mongoose.model(
  "Connector ",
  new mongoose.Schema({
    id: {
        required : true,
        type: String//CiString(36)
    },
    standard: {
        required : true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "ConnectorType"
    },
    format: {
        required : true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "ConnectorFormat"
    },
    power_type : {
        required : true,
        type: String,
        enum:[// ~PowerType~ enum
            'AC_1_PHASE',
            'AC_3_PHASE',
            'DC'
        ]
    },
    max_voltage: {
        required : true,
        type: Number
    },
    max_amperage: {
        required : true,
        type: Number
    },
    max_electric_power: {
	required: true,
        type: Number
    },
    tariff_ids: {
	required: true,
        type:Array //Array <CiString(36)>
    },
    terms_and_conditions: {
	required: true,
        type:String // URL:URL to the operator’s terms and conditions.
    },
    last_updated: {
        required: true,
        type:String //DateTime string(19) 2015-06-29T20:39:09
    }
},
{
    timestamps: true
}
));

module.exports =Connector ;