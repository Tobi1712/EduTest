let MaterialModel = require("../models/materials");
let ChapterModel = require("../models/chapter");
let TestModel = require("../models/Test");
let SlideModel = require("../models/slides");


let createMaterial = (req,res,next)=>{
    //if(req.user.type==='ADMIN'){
        var _id = req.body._id || null;
        var errors = req.validationErrors()
        if(errors){
            res.json({
                success : false,
                message : 'Недопустимые входные данные3',
                errors : errors
            })
        }
        else {
            var num = req.body.num;
            var topic =  req.body.topic;
            var chapter = req.body.chapter;
            var attempts = req.body.attempts;
            var period = req.body.period;
            var numQuestions = req.body.numQuestions;
            var duration = req.body.duration;
            var flag = req.body.flag;
            var testflag = req.body.testflag;
            if(_id!=null){
                MaterialModel.findOneAndUpdate({
                    _id : _id,
                    status : 1
                },
                { 
                    num : num,
                    topic : topic,
                    attempts : attempts,
                    period : period,
                    numQuestions : numQuestions,
                    duration : duration,
                    //slides: slides,
                    chapter : chapter, 
                    flag : flag,
                    testflag:testflag
                })
                .then(()=>{
                    res.json({
                        success : true,
                        message : `Материал успешно обновлен!`
                    })
                }).catch((err)=>{
                    res.status(500).json({
                        success : false,
                        message : "Не удалось обновить материал"+err
                    })
                })
            }
            else{
                MaterialModel.findOne({'topic':topic, status:1})
                .then((user)=>{
                    if(!user){
                            var tempdata = new MaterialModel({
                                num : num,
                                topic : topic,
                                chapter : chapter,
                                attempts : attempts,
                                period : period,
                                numQuestions : numQuestions,
                                duration : duration,
                            })
                            tempdata.save().then(()=>{
                                res.json({
                                    success : true,
                                    message : `Материал создан успешно!`
                                })
                            }).catch((err)=>{
                                console.log(err);
                                res.status(500).json({
                                    success : false,
                                    message : "Не удалось создать материал"+err
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
                        message : "Не удалось создать материал" +err
                    })
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


let deleteMaterial = (req,res,next)=>{
    //if(req.user.type==='ADMIN'){
        var _id =  req.body._id;
        MaterialModel.findOneAndUpdate({
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


let getAllMaterials = (req,res,next)=>{
    //if(req.user.type==='ADMIN'){

        // console.log('Param1234:',req);
        // console.log('Req:',req.user._id);
        let _chapterId = req.params._chapterId;
        console.log('JJJJJJJJJJJJJJJJJJJJJJJJJJ:',_chapterId);
     
        
        //let _id = req.params._id;
       
        // console.log("Chapter",_id);
        //console.log(req);
        //if(chapter.length!==0){
        MaterialModel.find({chapter:_chapterId, status : 1},{status : 0})
            // .populate({
            //     path: 'slides',
            //     model : SlideModel
            // })
            //.populate('chapter', 'name')
            //.populate('slides')
            .exec(function (err, material) {
                if (err){
                    console.log(err)
                    res.status(500).json({
                        success : false,
                        message : "Не удалось получить данные5"
                    })
                }
                else{
                    res.json({
                        success : true,
                        message : `Успешно`,
                        data : material
                    })
                }
            })        

        // }
        // else{
        //     MaterialModel.find({status : 1},{status : 0})
        //     .populate('chapter', 'name')
        //     .populate('slides')
        //     .exec(function (err, material) {
        //         if (err){
        //             console.log(err)
        //             res.status(500).json({
        //                 success : false,
        //                 message : "Не удалось получить данные"
        //             })
        //         }
        //         else{
        //             res.json({
        //                 success : true,
        //                 message : `Успешно`,
        //                 data : material
        //             })
        //         }
        //     })        
        // }
         }
//     else{
//         res.status(401).json({
//             success : false,
//             message : "Разрешения не предоставлены!"
//         })
//     } 
// }   
 

let getSingleMaterial = (req,res,next)=>{
        //if(req.user.type==='TRAINER'){
        let _id = req.params._id;
        MaterialModel.find({_id : _id,status : 1},{status : 0})
        // .populate({
        //     path: 'slides',
        //     model : SlideModel
        // })
     
        .then((info)=>{
            if(info.length === 0){
                res.json({
                    success : false,
                    message : `Эта учетная запись не существует!`,
                    
                })
            }
            else{
                res.json({
                    success : true,
                    message : `Успешно`,
                    data : info
                })
            }
               
            }).catch((err)=>{
                res.status(500).json({
                    success : false,
                    message : "Не удалось получить данные"
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
//  

let updateMaterial = (req,res,next)=>{
    var _id = req.body._id;
    console.log("REQ:", req.body)
    var m = req.body.m;
    // var flag = req.body.flag;
    // var testflag = req.body.testflag;
    if(m==0){
        const cursor1 = SlideModel.find({materialId:_id, status:1})
        .populate({
            path: 'materials',
            model : MaterialModel
        })
        .exec(function (err, data) {
            var slideflag;
            var tflag;

            console.log("DATA2:", data.length)

            // // if test started
            // slideflag = data[0].startTest==true && data[0].endTest===false ? true : false

            // // if test ended
            // tflag = data[0].endTest===true && data[0].startTest==false ? true : false
            var slflag = data.length==0 ? true : false;
            console.log("DATA2K:", slflag)

            if(_id!=null){
                console.log("_ID is not null")
                MaterialModel.findOneAndUpdate({
                    _id : _id,
                    status : 1
                },
                { 
                    $set:{
                        flag:slflag,
                        testflag: false
                    }
                }).then(()=>{
                    res.json({
                        success : true,
                        message : `Material успешно обновлены!`
                    })
                }).catch((err)=>{
                    res.status(500).json({
                        success : false,
                        message : "Не удалось обновить Answers"+err
                    })
                })
            }
        });
    }
    else if(m==1){
        console.log("YYYYYYYYYY")
    const cursor = TestModel.find({materialid:_id, status:1})
    .populate({
        path: 'materials',
        model : MaterialModel
    })
    .exec(function (err, data) {
        var slideflag;
        var tflag;

        // if test started
        slideflag = data[0].startTest==true && data[0].endTest===false ? true : false
        slideflag = data[0].startTest==false && data[0].endTest===false ? false : false

        // if test ended
        tflag = data[0].endTest===true && data[0].startTest==false ? true : false
        tflag = data[0].endTest===false && data[0].startTest==false ? false : false
        if(_id!=null){
            console.log("_ID is not null")
            MaterialModel.findOneAndUpdate({
                _id : _id,
                status : 1
            },
            { 
                $set:{
                    flag:slideflag,
                    testflag:tflag
                }
            }).then(()=>{
                res.json({
                    success : true,
                    message : `Material успешно обновлены!`
                })
            }).catch((err)=>{
                res.status(500).json({
                    success : false,
                    message : "Не удалось обновить Answers"+err
                })
            })
        }
    });
}

    // if(_id!=null){
    //     console.log("_ID is not null")
    //     MaterialModel.findOneAndUpdate({
    //         _id : _id,
    //         status : 1
    //     },
    //     { 
    //         $set:{
    //             flag:flag,
    //             testflag:testflag
    //         }
    //     }).then(()=>{
    //         res.json({
    //             success : true,
    //             message : `Material успешно обновлены!`
    //         })
    //     }).catch((err)=>{
    //         res.status(500).json({
    //             success : false,
    //             message : "Не удалось обновить Answers"+err
    //         })
    //     })
    // }
}

module.exports = { createMaterial, getAllMaterials, getSingleMaterial, deleteMaterial, updateMaterial}







