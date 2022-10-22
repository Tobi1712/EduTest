//view all subjects and single subject
let SlideModel = require("../models/slides");


let createSlide = (req,res,next)=>{
    var _id = req.body._id || null;
    //if(req.user.type==='ADMIN'){
    //req.check('topic', `invalid topic`).notEmpty();
    var errors = req.validationErrors()
    console.log(errors);
    if(errors){
        res.json({
            success : false,
            message : 'Недопустимые входные данные',
            errors : errors
        })
    }
    else {
        var slbody =  req.body.slbody;
        var slimage = req.body.slimage;
        var materialId = req.body.materialId;
        var chapterId = req.body.chapterId;
        if(_id!=null){
            SlideModel.findOneAndUpdate({
                _id : _id,
                status : 1
            },
            {
                slbody : slbody,
                slimage : slimage,
                materialId : materialId,
                chapterId : chapterId
            }).then(()=>{
                res.json({
                    success: true,
                    message :  "Слайд был изменен"
                })
            }).catch((err)=>{
                res.status(500).json({
                    success : false,
                    message : "Не удалось изменить название темы"
            })
        })

    }
        else{   
            SlideModel.findOne({_id : _id}).then((info)=>{
                if(!info){
                    var tempdata = SlideModel({
                        //_id : _id,
                        slbody : slbody,
                        slimage:slimage,
                        materialId:materialId,
                        chapterId:chapterId
                        //createdBy : req.user._id
                    })
                    tempdata.save().then(()=>{
                        res.json({
                            success : true,
                            message : `Новый слайд успешно создан!`
                        })
                    }).catch((err)=>{
                        console.log(err);
                        res.status(500).json({
                            success : false,
                            message : "Не удалось создать новый слайд!"
                        })
                    })
                }
                else{
                    res.json({
                        success : false,
                        message : `Этот слайд уже существует!`
                    })
                }   

            }).catch((err)=>{
                res.status(500).json({
                    success : false,
                    message : "Не удалось создать слайд" +err
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

let getAllSlides = (req,res,next)=>{
    console.log("ParamsSLides", req.params._materialId);
    let _materialId = req.params._materialId;
    SlideModel.find({status : 1, materialId:_materialId},{createdAt: 0, updatedAt : 0})
    //.populate('createdBy', 'name')
    
    .exec(function (err, slide) {
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
                data : slide
            })   
        }
    })        
}

let getSingleSlide = (req,res,next)=>{
    let id = req.params._id;
    console.log(id);
    SlideModel.find({_id: id, status:1},{createdAt: 0, updatedAt : 0,status : 0})
    //.populate('createdBy', 'name')
    .exec(function (err, slide) {
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
                data : slide
            })   
        }
    })        
}

let deleteSlide = (req,res,next)=>{
    //if(req.user.type==='ADMIN'){
        var _id =  req.body._id;
        SlideModel.findOneAndUpdate({
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

    module.exports = { createSlide ,getAllSlides, getSingleSlide, deleteSlide}
    
