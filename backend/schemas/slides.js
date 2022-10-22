var mongoose = require("mongoose");
//var UserModel = require("../models/user");

var slidesschema = new mongoose.Schema({
    slbody : {
        required : false,
        type : String
    },
    slimage : {
        required : false,
        type : String
    },
    materialId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MaterialModel',
        required : false
    },
    chapterId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChapterModel',
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


module.exports = slidesschema;
