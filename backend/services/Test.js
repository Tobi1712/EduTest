let TestModel = require("../models/Test");
let MaterialModel = require("../models/materials");
var moment = require('moment');

let TestAllDetails = (req,res,next)=>{
    let _materialId = req.params._materialId;
    // console.log("MMMMMMMMMMMMMMMMMMMMM:", req)
    TestModel.find({materialid: _materialId, status: 1},{createdAt: 0, updatedAt : 0})
    .populate('materials')
    .exec(function (err, test) {
        if (err){
            console.log(err)
            res.status(500).json({
                success : false,
                message : "Не удалось получить данные Test 1" + err
            })
        }
        else{
            res.json({
                success : true,
                message : `Успешно`,
                data : test
            })   
        }
    })        
}




let TestCreate = async(req,res,next)=>{

    console.log(req.user.type);
    var _id = req.body._id || null;
    console.log(req.body);
//    if(req.user.type==='CUSTOMER'){
    var errors = req.validationErrors()
    if(errors){
        res.json({
            success : false,
            message : 'Недопустимые входные данные Test 2' + errors,
            errors : errors
        })
    }
    else {

        var chapterid = req.body.chapterid;
        var materialid = req.body.materialid;
        // var userid = req.user._id;
        //var startDate = new Date(req.body.startDate);
        var startDate = req.body.startDate;
        var complationDate = req.body.complationDate;
        var startTest = req.body.startTest;
        var endTest = req.body.endTest;
        var result = req.body.result;

        console.log("TTTTTTTTT:",req.body.materialid);

        if(materialid!==null || materialid!==undefined || materialid!=='null' || materialid!=='undefined'){
            async function Duration(materialid){
                return MaterialModel.findOne({_id: materialid}).then(mat => mat.duration);
            };
            
            let duration = await Duration(materialid);

            var date1=new Date(complationDate).getTime();
            date1 += ( duration * 60 * 1000);
            // console.log(new Date(date1).toUTCString());
            date2 = new Date(date1).toUTCString();
        }
        var date3=new Date(complationDate);
        console.log("DATE TIME:", new Date(date3.getTime() - date3.getTimezoneOffset() * 60000));

        // if(_id!==null){
        //     console.log('INUPdate')
        //     TestModel.findOneAndUpdate({
        //         _id : _id,
        //         status : 1
        //     },
        //     { 
        //         // startDate: startDate,
        //         // complationDate : date2,
        //         startTest : startTest,
        //         endTest : endTest,
        //         result : 5
        //     })
        //     .then(()=>{
        //         res.json({
        //             success : true,
        //             message : `Тест успешно обновлен!`
        //         })
        //     }).catch((err)=>{
        //         res.status(500).json({
        //             success : false,
        //             message : "Не удалось обновить Тест"+err
        //         })
        //     })



        // }
        if(_id===null){
            console.log("SD", materialid)
            TestModel.findOne({'materialid':materialid, status:1}).then((user)=>{
                console.log("SDF", !user)
                if(!user){
                    console.log("SDFGF")
                    var tempdata = new TestModel({
                        chapterid : chapterid,
                        materialid: materialid,
                        // userid: userid,
                        startDate: new Date(startDate),
                        complationDate : new Date(date2),
                        startTest : startTest,
                        endTest:endTest,
                        result:result
                        })
                        tempdata.save().then(()=>{
                            console.log("SDFG")
                            res.json({
                                success : true,
                                message : `Тест создан успешно!`
                            })
                        }).catch((err)=>{
                            console.log(err);
                            res.status(500).json({
                                success : false,
                                message : "Не удалось создать Тест"+err
                            })
                        })
                    }
                }).catch((err)=>{
                    res.status(500).json({
                        success : false,
                        message : "Не удалось создать Теста" +err
                    })
                }) 
            }
                       
        }
 //   }
 //   else{
  //      res.status(401).json({
   //         success : false,
    //        message : "Разрешения не предоставлены!"
    //    })
//    }
}


let updateTest = (req,res,next)=>{
    var _id = req.body._id;
    var chapterid = req.body.chapterid;
    var materialid = req.body.materialid;
    // var userid = req.user._id;
    var startDate = req.body.startDate;
    var complationDate = req.body.complationDate;
    var startTest = req.body.startTest;
    var endTest = req.body.endTest;
    var result = req.body.result;
    if(_id!==null){
        console.log("_ID is not null")
        TestModel.findOneAndUpdate({
            _id : _id,
            status : 1
        },
        { 
            $set:{
                startTest : startTest,
                endTest : endTest,
                result :result
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




let getSingleTestHistory = (req,res,next)=>{
    //if(req.user.type==='ADMIN'){
        let _id = req.params._id;

        TestModel.find({_id : _id,status : 1},{status : 0}).then((info)=>{
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
                message : "Не удалось получить данные11"+err
            })
        })
    }
    /*else{
        res.status(401).json({
            success : false,
            message : "Разрешения не предоставлены!"
        })
    }    */

    


 
//create test papers

module.exports = { TestAllDetails, TestCreate, getSingleTestHistory, updateTest}

