var mongoose = require("mongoose");
var DivisionModel = require("../models/division");


var divisionschema = new mongoose.Schema({

    name : {
        required : true,
        type : String,
    },
    description :{
        required : false,
        type : String
    },
    company :{ 
        type: mongoose.Schema.Types.ObjectId,
        ref : 'CompanyModel',
        required : false
    },
    status:{
        type: Boolean,
        default : 1,
        required : true
    },
},

    { timestamps: {}}

    );




module.exports = divisionschema;
