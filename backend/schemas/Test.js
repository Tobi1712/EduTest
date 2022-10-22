var mongoose = require("mongoose");
var Test = new mongoose.Schema({
    chapterid : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChapterModel',
        required : false
    },
    materialid : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MaterialModel',
        required : false
    },
    // userid:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'UserModel',
    //     required : false
    // },
    startDate:{
        type:String,
        required:false,
        timestamps: true
    }, 
    complationDate:{
        type:String,
        required:false,
        timestamps: true
    },  
    startTest:{
        type: Boolean,
        required:false,
        default:0,
    },
    endTest:{
        type:Boolean,
        required:false,
        default:1
    },
    result:{
        type:Number,
        required:false,
    },
    status : {
        required : true,
        default : 1,
        type : Boolean
    },
})
module.exports = Test;
 