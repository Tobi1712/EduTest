var mongoose = require("mongoose");
var UserModel = require("../models/user");


var userschema = new mongoose.Schema({
    name : {
        required : true,
        type : String
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
    contact: {
        required : false,
        type : String,
        unique : true
    }, 
    avatar : {
        required : false,
        type : String
    },
    type : {
        required : true ,
        type : String,
        default : `TRAINER`
    },

    company :{ 
        type: mongoose.Schema.Types.ObjectId,
        ref : 'CompanyModel',
        required : false
    },
    division :{ 
        type: mongoose.Schema.Types.ObjectId,
        ref : 'DivisionModel',
        required : false
    },

    status:{
        required : true,
        default : 1,
        type : Boolean
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }
    

},

    { timestamps: {}}

    );




module.exports = userschema;
