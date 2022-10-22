let AnswersModel = require("../models/answers");
var options = require("../models/option");
let TestModel = require("../models/Test");


let getAllAnswers = (req,res,next)=>{
    AnswersModel.find({materialid: _materialId, status : 1},{createdAt: 0, updatedAt : 0})
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


let createAnswers = (req,res,next)=>{
    console.log(req.user.type);
    var _id = req.body._id || null;
    var materialid = req.body.materialid;
    var testid = req.body.testid;
    var chosenOption = req.body.chosenOption;
    var userid = req.user._id;

    if(_id!=null){
        AnswersModel.findOneAndUpdate({
            _id : _id,
             status : 1
        },
        { 
            materialid : materialid,
            // testid : testid,
            userid : userid,
            chosenOption : chosenOption
        }).then(()=>{
            res.json({
                success : true,
                message : `Ответы успешно обновлены!`
            })
        }).catch((err)=>{
            res.status(500).json({
                success : false,
                message : "Не удалось обновить ответы"+err
            })
        })
    }
    else{
        AnswersModel.findOne({userid:userid, status:1}).then((user)=>{
            if(!user){
                var tempdata = new AnswersModel({
                    // questionid : questionid,
                    materialid : materialid,
                    testid : testid,
                    userid : userid,
                    chosenOption: chosenOption
                })
                tempdata.save().then(()=>{
                    res.json({
                        success : true,
                        message : `Ответ создан успешно!`
                    })
                }).catch((err)=>{
                        console.log(err);
                        res.status(500).json({
                            success : false,
                            message : "Не удалось создать ответы"+err
                        })
                    })
            }
            else{
                res.json({
                    success : false,
                    message : `Этот id уже существует!`
                })
            }
        }).catch((err)=>{
            res.status(500).json({
                success : false,
                message : "Не удалось создать ответы" +err
            })
        }) 
    }
}

// let getSingleAnswers = (req,res,next)=>{
//         let _id = req.params._id;
//         // console.log("JHFJ",req.params);

//         AnswersModel.find({_id : _id,status : 1},{createdBy : 0,status : 0})
//         // .populate({
//         //     path: 'materials',
//         //     model : MaterialModel
//         // })
//         .then((info)=>{
//             if(info.length === 0){
//                 res.json({
//                     success : false,
//                     message : `Этот раздел не существует!`,
                
//                 })
//             }
//             else{
//                 res.json({
//                     success : true,
//                     message : `Успешно`,
//                     data : info
//                 })

//             }
           
//         }).catch((err)=>{
//             res.status(500).json({
//                 success : false,
//                 message : "Не удалось получить данные"
//             })
//         })
//     }

    


// let removeAnswers = (req,res,next)=>{
//         var _id =  req.body._id;
//         AnswersModel.findOneAndUpdate({
//             _id : _id
//         },{
//             status: 0
//         }).then(()=>{
//             res.json({
//                 success: true,
//                 message :  "Раздел был удален"
//             })
//         }).catch((err)=>{
//             res.status(500).json({
//                 success : false,
//                 message : "Невозможно удалить раздел"
//             })
//         })

// }
 


module.exports = { getAllAnswers, createAnswers}

