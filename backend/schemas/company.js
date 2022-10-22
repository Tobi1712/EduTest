var mongoose = require("mongoose");
var CompanyModel = require("../models/company");


var companyschema = new mongoose.Schema({

    name : {
        required : false,
        type : String
    },
    logo : {
        required : false,
        default : null,
        type : String
    },
    descr :{
        required : false,
        type : String,
    },
    licFromDate:{
        required : false,
        type : Date,
    },
    licToDate:{
        required : false,
        type : Date,
    },
    numOfLic:{
        required : false,
        default : 0,
        type : Number
    },
    numOfLicAcc : {
        required : false,
        default : 0,
        type : Number
    },
    status:{
        type: Boolean,
        default : 1,
        required : true
    },
    contact:{
        required : false,
        type : String,
    }
    
},

    { timestamps: {}}

    );

module.exports = companyschema;
