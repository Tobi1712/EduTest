var mongoose = require("mongoose");
var ChapterModel = require("../models/chapter");


var chapterschema = new mongoose.Schema({

    name : {
        required : true,
        type : String,
        unique : true
    },
    descr :{
        required : false,
        type : String,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    materials:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MaterialModel'
    }],
    icon1 : {
        required : false,
        type : String
    },
    icon2 : {
        required : false,
        type : String
    },
    icon3 : {
        required : false,
        type : String
    },
    icon4 : {
        required : false,
        type : String
    },
    status:{
        type: Boolean,
        default : 1,
        required : true
    },
},

    { timestamps: {}}

    );




module.exports = chapterschema;
