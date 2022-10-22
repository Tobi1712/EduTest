let AnswersModel = require("../models/answers");
let MaterialModel = require("../models/materials");
let TestModel = require("../models/Test");
let QuestionModel = require("../models/questions");


let getAllAnswers1 = (req,res,next)=>{
    let _materialId = req.params._materialId;
    AnswersModel.find({materialid:_materialId, status : 1},{})
    /*.populate(
         'division', 'name'
    )*/
    // .populate({
    //     path: 'materials',
    //     model : MaterialModel
    // })
    .exec(function (err, answer) {
        if (err){
            console.log(err)
            res.status(500).json({
                success : false,
                message : "Не удалось получить данные"
            })
        }
        else{
            res.json({
                success : true,
                message : `Успешно`,
                data : answer
            })   
        }
    })        
}


let createRandAnswers = (req,res,next)=>{
    // console.log("AAAAAAANM", req.body);
    var _id = req.body._id || null;
    var materialid = req.body.materialId;
    var testid = req.body.testid;
    // console.log("TestId:", req);
    var userid = req.user._id;
    var questions=[];
    const cursor = QuestionModel.find({material:materialid, status:1})
    .populate({
        path: 'materials',
        model : MaterialModel
    })
    .exec(function (err, question) {

        var arr=[];
        while (arr.length < 5){
            var k = Math.floor(Math.random()*question.length);
            const rndval=question[k];

            if(arr.includes(rndval)){
                var k = Math.floor(Math.random()*question.length);
            }
            else{
                arr.push(rndval);
            }
        }

        ques=[]
        arr.map((d,i)=>{
            ques[i]=(
              {
                questionid: d._id,
                questionText: d.body,
                options: [
                  { answers: d.answer1, isAnswer: d.trueans1, userAnswer: d.userAnswer1 },
                  { answers: d.answer2, isAnswer: d.trueans2, userAnswer: d.userAnswer2 },
                  { answers: d.answer3, isAnswer: d.trueans3, userAnswer: d.userAnswer3 },
                  { answers: d.answer4, isAnswer: d.trueans4, userAnswer: d.userAnswer4 },
                  { answers: d.answer5, isAnswer: d.trueans5, userAnswer: d.userAnswer5 }
                ]
              }
            )
        });
        console.log(_id)

        if(_id===null){
            console.log("_ID is null")
            AnswersModel.findOne({'materialid':materialid, status:1})
            .then((info)=>{
                if(!info){
                    var tempdata = AnswersModel({
                        materialid: materialid,
                        testid : testid,
                        userid : userid,
                        chosenOption : ques,
                    })
                    tempdata.save().then(()=>{
                        res.json({
                            success : true,
                            message : `Новый вопрос создан успешно11!`
                        })
                    }).catch((err)=>{
                        // console.log(err);
                        res.status(500).json({
                            success : false,
                            message : "Не удалось создать новый вопрос!"
                        })
                    })
                }
                else{
                    res.json({
                        success : false,
                        message : `Этот вопрос уже существует!`
                    })
                }   
            })
        }
    });
           
}

let updateAnswer = (req,res,next)=>{
    var _id = req.body.ansId;
    var testid=req.body.testid;
    var ansArr = req.body.chosenOption.options;
    var oid = req.body.chosenOption._id;
    var c = req.body.c;
    
    if(_id!=null){
        console.log("_ID is not null")
        AnswersModel.findOneAndUpdate({
            _id : _id,
            "chosenOption._id": oid,
            status : 1
        },
        { 
            $set:{
                testid:testid,
                "chosenOption.$.options":ansArr
            }
        }).then(()=>{
            res.json({
                success : true,
                message : `Answers успешно обновлены!`
            })
        }).catch((err)=>{
            res.status(500).json({
                success : false,
                message : "Не удалось обновить Answers"+err
            })
        })
    }
}


module.exports = { getAllAnswers1, createRandAnswers, updateAnswer } 