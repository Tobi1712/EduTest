var mongoose = require("mongoose");
var answerSchema = new mongoose.Schema({

    materialid : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MaterialModel',
        required : false
    },
    testid : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TestModel',
        required : false
    },
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required : false
    },
    chosenOption : [
        {
            questionid : {
                required : false,
                type : mongoose.Schema.Types.ObjectId 
            },
            questionText : {
                required : false,
                type : String 
            },
            options:[
                {
                    answers: {
                        type : String,
                        required : false,
                    },
                    isAnswer : {
                        type : Boolean,
                        required : true,
                        default : false
                    },
                    userAnswer:{
                        type : Boolean,
                        required : true,
                        default : false
                    }
                }
            ]
        }
    ],
    status:{
        type: Boolean,
        default : 1,
        required : true
    }
    
})
module.exports = answerSchema;
 