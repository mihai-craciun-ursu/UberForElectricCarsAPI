const mongoose = require("mongoose");

const Connector  = mongoose.model(
  "Connector",
  new mongoose.Schema({
    standard: {
        required : true,
        type: String,
        enum: ['CHADEMO', 'DOMESTIC_A', 'DOMESTIC_B', 'DOMESTIC_C', 'DOMESTIC_D', 'DOMESTIC_E', 'DOMESTIC_F', 'DOMESTIC_G',
        'DOMESTIC_H', 'DOMESTIC_I', 'DOMESTIC_J', 'DOMESTIC_K', 'DOMESTIC_L', 'IEC_60309_2_single_16', 'IEC_60309_2_three_16', 
       'IEC_60309_2_three_32', 'IEC_60309_2_three_64', 'IEC_62196_T1', 'IEC_62196_T1_COMBO',  'IEC_62196_T2',  'IEC_62196_T2_COMBO', 
        'IEC_62196_T3A',  'IEC_62196_T3C', 'PANTOGRAPH_BOTTOM_UP', 'PANTOGRAPH_TOP_DOWN', 'TESLA_R', 'TESLA_S']
    },
    format: {
        required : true,
        type: String,
        enum: [// ~PowerType~ enum
            'SOCKET',
            'CABLE',
        ]
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
        type:Array //Array <CiString(36)>
    },
    terms_and_conditions: {
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

module.exports = Connector;