let QuestionModel = require("../models/questions");
let tool = require("./tool");


let createQuestion = (req,res,next)=>{
    //if(req.user.type==='TRAINER'){
        var _id = req.body._id || null;
        console.log('req.body',req.body);
        req.check('body', `Неверный вопрос!`).notEmpty();
        var errors = req.validationErrors()
        if(errors){
            res.json({
                success : false,
                message : 'Недопустимые входные данные',
                errors : errors
            })
        }
        else {
            console.log('DFRG',req.body);
            var body =  req.body.body;
            // var options =  req.body.options;
            var quesimg =  req.body.quesimg;
            var difficulty =  req.body.difficulty;
            var material = req.body.material;
            var answer1 = req.body.answer1;
            var trueans1 = req.body.trueans1;
            var answer2 = req.body.answer2;
            var trueans2 = req.body.trueans2;
            var answer3 = req.body.answer3;
            var trueans3 = req.body.trueans3;
            var answer4 = req.body.answer4;
            var trueans4 = req.body.trueans4;
            var answer5 = req.body.answer5;
            var trueans5 = req.body.trueans5;
            var MyAnswers = req.body.MyAnswers;
            var anscount = 0;
            
            
            console.log('anscount:',anscount);
            if(_id!= null){
                QuestionModel.findOneAndUpdate({
                    _id : _id,
                    status : 1
                },
                
                { 
                    body : body,
                    quesimg : quesimg,
                    difficulty : difficulty,
                    anscount : anscount,
                    answer1 : answer1,
                    trueans1 : trueans1,
                    answer2 : answer2,
                    trueans2 : trueans2,
                    answer3 : answer3,
                    trueans3 : trueans3,
                    answer4 : answer4,
                    trueans4 : trueans4,
                    answer5 : answer5,
                    trueans5 : trueans5,
                    MyAnswers : MyAnswers
                }).then(()=>{
                    res.json({
                        success : true,
                        message : `Данные успешно обновлены!`
                    })
                }).catch((err)=>{
                    res.status(500).json({
                        success : false,
                        message : "Не удалось обновить данные"+err
                    })
                })
            }
            else{
                QuestionModel.findOne({ body : body,status:1 },{status:0})
                .then((info)=>{
                    // console.log('INFO:',info);
                    if(!info){
                        
                                // var ra=[];
                                // console.log("asas",op)
                                // op.map((d,i)=>{
                                //     if(d.isAnswer){
                                //         ra.push(d._id)
                                //     }
                                // })
                                var tempdata = QuestionModel({
                                    body: body,
                                    quesimg : quesimg,
                                    material : material,
                                    difficulty :difficulty,
                                    answer1 : answer1,
                                    trueans1 : trueans1,
                                    answer2 : answer2,
                                    trueans2 : trueans2,
                                    answer3 : answer3,
                                    trueans3 : trueans3,
                                    answer4 : answer4,
                                    trueans4 : trueans4,
                                    answer5 : answer5,
                                    trueans5 : trueans5,
                                    createdBy : req.user._id,
                                    anscount:anscount,
                                    MyAnswers : MyAnswers
                                })
                                tempdata.save().then(()=>{
                                    res.json({
                                        success : true,
                                        message : `Новый вопрос создан успешно!`
                                    })
                                }).catch((err)=>{
                                    console.log(err);
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
            
        }
        
    }

//     else{
//         res.status(401).json({
//             success : false,
//             message : "Разрешения не предоставлены!"
//         })
//     }
// }
let deleteImage = (req,res,next)=>{
    //if(req.user.type==='TRAINER'){
        var _id =  req.body._id;
        QuestionModel.findOneAndUpdate({
            _id : _id
        },
        {
            quesimg : null
        }).then(()=>{
            res.json({
                success: true,
                message :  "Картинка был удален"
            })
        }).catch((err)=>{
            res.status(500).json({
                success : false,
                message : "Не удалось удалить картинка"
            })
        })
    }

let deleteQuestion = (req,res,next)=>{
    //if(req.user.type==='TRAINER'){
        var _id =  req.body._id;
        QuestionModel.findOneAndUpdate({
            _id : _id
        },
        {
            status : 0
        }).then(()=>{
            res.json({
                success: true,
                message :  "Вопрос был удален"
            })
        }).catch((err)=>{
            res.status(500).json({
                success : false,
                message : "Не удалось удалить вопрос"
            })
        })
    }
    

    
//     else{
//         res.status(401).json({
//             success : false,
//             message : "Разрешения не предоставлены!"
//         })
//     } 
// }


let getAllQuestions = (req,res,next)=>{
    //if(req.user.type==='TRAINER'){
        //var subject = req.body.subject;
        //var chapter = req.body.chapter;
        
        var _materialId = req.params._materialId;
        console.log("Material",_materialId);
        //if(subject.length!==0){
        if(_materialId !== null){
            QuestionModel.find({/*subject : subject*/material:_materialId,status : 1},{status : 0})
            .populate('createdBy', 'name')
           // .populate('subject', 'topic')
            // .populate('options')
            .exec(function (err, question) {
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
                        data : question
                    })
                }
            })        

        }
        else{
            QuestionModel.find({status : 1},{status : 0})
            .populate('createdBy', 'name')
            // .populate('subject', 'topic')
            // .populate('options')
            .exec(function (err, question) {
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
                        data : question
                    })
                }
            })        
        }
        }
//     else{
//         res.status(401).json({
//             success : false,
//             message : "Разрешения не предоставлены!"
//         })
//     } 
// }   
 




let getSingleQuestion = (req,res,next)=>{
    //if(req.user.type==='TRAINER'){
        let _id = req.params._id;
        console.log("asas",_id);
        QuestionModel.find({_id : _id , status : 1},{status : 0})
        .populate('questions', 'body')
        //.populate('subject', 'topic')
        // .populate('options')
        .exec(function (err, question) {
            if (err){
                console.log(err)
                res.status(500).json({
                    success : false,
                    message : "Не удалось получить данные"
                })
            }
            else{
                if(question.length===0){
                    res.json({
                        success : false,
                        message : `Такого вопроса не существует`,
                    })
                }
                else{
                    res.json({
                        success : true,
                        message : `Успешно`,
                        data : question
                    })
                }   
            }
        })        
    }
//     else{
//         res.status(401).json({
//             success : false,
//             message : "Разрешения не предоставлены!"
//         })
//     }    
// }
 
//create test papers

module.exports = { createQuestion, getAllQuestions, getSingleQuestion, deleteQuestion, deleteImage}







