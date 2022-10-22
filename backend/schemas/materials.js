var mongoose = require("mongoose");
//var UserModel = require("../models/user");

var materialschema = new mongoose.Schema({
    num : {
        required : false,
        type : Number
    },//
    topic : {
        required : true,
        type : String
    },
    attempts : {
        type : Number,
        required : true,
        default : 2
    },
    period : {
        type : Number,
        required : true,
        default : 7
    },
    numQuestions : {
        type : Number,
        required : true,
    },
    duration : {
        type : Number,
        required : true
    },
    chapter:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChapterModel',
        required : false
    },
    questionid:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'QuestionModel',
        required : false
    },
    testid : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TestModel',
        required : false
    },
    status:{
        type: Boolean,
        default : 1,
        required : true
    },
    flag:{
        type: Boolean,
        default : 0,
    },
    testflag:{
        type: Boolean,
        default : 0,
    }
},
{ timestamps: {}}

);


module.exports = materialschema;
