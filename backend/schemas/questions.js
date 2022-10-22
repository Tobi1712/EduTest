var mongoose = require("mongoose");
var UserModel = require("../models/user");


var questionschema = new mongoose.Schema({
     body : {
        required : true ,
        type : String
    },
    anscount : {
        required : true,
        type : Number,
        default : 1

    },

    answer1:{
        type : String
    },
    trueans1 : {
        type: Boolean
    },
    userAnswer1 : {
        type:Boolean,
        default:false
    },

    answer2:{
        type : String
    },
    trueans2 : {
        type: Boolean
    },
    userAnswer2 : {
        type:Boolean,
        default:false
    },
    
    answer3:{
        type : String
    },
    trueans3 : {
        type: Boolean
    },
    userAnswer3 : {
        type:Boolean,
        default:false
    },

    answer4:{
        type : String
    },
    trueans4 : {
        type: Boolean
    },
    userAnswer4 : {
        type:Boolean,
        default:false
    },

    answer5:{
        type : String
    },
    trueans5 : {
        type: Boolean
    },
    userAnswer5 : {
        type:Boolean,
        default:false
    },

    answers:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'AnswersModel',
        required : false
    },
    material:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MaterialModel',
        required : false
    },
    quesimg: { 
        required : false,
        type : String
    },
    difficulty:{
        required : true,
        default : 0,
        type : Number
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    status:{
        type: Boolean,
        default : 1,
        required : true
    }
},

    { timestamps: {}}

    );

    module.exports = questionschema;



