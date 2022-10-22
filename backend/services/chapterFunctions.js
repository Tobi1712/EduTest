let ChapterModel = require("../models/chapter");
let MaterialModel = require("../models/materials");


let chapterdetails = (req,res,next)=>{
    ChapterModel.find({status : 1},{createdAt: 0, updatedAt : 0})
    /*.populate(
         'division', 'name'
    )*/
    .populate({
        path: 'materials',
        model : MaterialModel
    })
    .exec(function (err, chapter) {
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
                data : chapter
            })   
        }
    })        
}


let createChapter = (req,res,next)=>{
    console.log(req.user.type);
    var _id = req.body._id || null;
//    if(req.user.type==='CUSTOMER'){
        req.check('name', `Недопустимое имя`).notEmpty();
        /*if(_id==null){
            req.check('emailid', ` Invalid email address`).isEmail().notEmpty();
        }*/
        // console.log("ghj:",req.body);
        var errors = req.validationErrors()
        if(errors){
            res.json({
                success : false,
                message : 'Недопустимые входные данные',
                errors : errors
            })
        }
        else {
            var name =  req.body.name;
            var descr = req.body.descr;
            var icon1 = req.body.icon1;
            var icon2 = req.body.icon2;
            var icon3 = req.body.icon3;
            var icon4 = req.body.icon4;
            var materials = req.body.materials;
            if(_id!=null){
                ChapterModel.findOneAndUpdate({
                    _id : _id,
                    status : 1
                },
                { 
                    name : name,
                    descr : descr,
                    icon1 : icon1,
                    icon2 : icon2,
                    icon3 : icon3,
                    icon4 : icon4,
                    materials : materials,
                }).then(()=>{
                    res.json({
                        success : true,
                        message : `Раздел успешно обновлен!`
                    })
                }).catch((err)=>{
                    res.status(500).json({
                        success : false,
                        message : "Не удалось обновить раздел"+err
                    })
                })
            }
            else{
                ChapterModel.findOne({'name':name, status:1}).then((user)=>{
                    if(!user){
                            var tempdata = new ChapterModel({
                                name : name,
                                descr : descr,
                                icon1 : icon1,
                                icon2 : icon2,
                                icon3 : icon3,
                                icon4 : icon4,
                                materials : materials,
                            })
                            tempdata.save().then(()=>{
                                res.json({
                                    success : true,
                                    message : `Раздел создан успешно!`
                                })
                            }).catch((err)=>{
                                console.log(err);
                                res.status(500).json({
                                    success : false,
                                    message : "Не удалось создать раздел"+err
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
                        message : "Не удалось создать раздел" +err
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

let getSingleChapter = (req,res,next)=>{
    //if(req.user.type==='ADMIN'){
        let _id = req.params._id;
        console.log("JHFJ",req.params);

        ChapterModel.find({_id : _id,status : 1},{createdBy : 0,status : 0})
        .populate({
            path: 'materials',
            model : MaterialModel
        })
        .then((info)=>{
            if(info.length === 0){
                res.json({
                    success : false,
                    message : `Этот раздел не существует!`,
                
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
    /*else{
        res.status(401).json({
            success : false,
            message : "Разрешения не предоставлены!"
        })
    }    */

    


let removeChapter = (req,res,next)=>{
    //if(req.user.type==='ADMIN'){
        var _id =  req.body._id;
        ChapterModel.findOneAndUpdate({
            _id : _id
        },{
            status: 0
        }).then(()=>{
            res.json({
                success: true,
                message :  "Раздел был удален"
            })
        }).catch((err)=>{
            res.status(500).json({
                success : false,
                message : "Невозможно удалить раздел"
            })
        })
 /*   }
    else{
        res.status(401).json({
            success : false,
            message : "Разрешения не предоставлены!"
        })
    } */
}
 
//create test papers

module.exports = { chapterdetails, createChapter, getSingleChapter, removeChapter}

