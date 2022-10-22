var mongoose = require("mongoose");
// var CustomerModel = require("../models/customer");


var customerschema = new mongoose.Schema({
    name : {
        required : true,
        type : String,
        unique : true
    },
    password : {
        required : true ,
        type : String
    },
    emailid :{
        required : true,
        type : String,
        unique : true
    },
    avatar : {
        required : false,
        default : null,
        type : String
    },
    status:{
        type: Boolean,
        default : 1,
        required : true
    },
    company :{ 
        type: mongoose.Schema.Types.ObjectId,
        ref : 'CompanyModel',
        required : false
    },
    division :{ 
        type: mongoose.company.Types.ObjectId,
        ref : 'DivisionModel',
        required : false
    },
    type : {
        required : true ,
        type : String,
        default : `CUSTOMER`
    },
},

    { timestamps: {}}

    );




module.exports = customerschema;
