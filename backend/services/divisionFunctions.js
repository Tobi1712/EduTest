let DivisionModel = require("../models/division");

let divisiondetails = (req,res,next)=>{
    DivisionModel.find({status: 1},{createdAt: 0, updatedAt : 0})
    .populate('company', 'name')
    .exec(function (err, division) {
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
                data : division
            })   
        }
    })        
}




let divisionCreate = (req,res,next)=>{
    console.log(req.user.type);
    var _id = req.body._id || null;
//    if(req.user.type==='CUSTOMER'){
        req.check('name', `Недопустимое имя`).notEmpty();
        if(_id==null){
            req.check('name', `Недопустимое название подразделения`);
        }
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
            var description =  req.body.description;
            var company = req.body.company;
            if(_id!=null){
                DivisionModel.findOneAndUpdate({
                    _id : _id,
                    status : 1
                },
                { 
                    name : name,
                    description: description,
                    company : company
                }).then(()=>{
                    res.json({
                        success : true,
                        message : `Профиль подразделения успешно обновлен!`
                    })
                }).catch((err)=>{
                    res.status(500).json({
                        success : false,
                        message : "Не удалось обновить профиль подразделения"+err
                    })
                })
            }
            else{
                DivisionModel.findOne({'name':name, status:1}).then((user)=>{
                    if(!user){
                            var tempdata = new DivisionModel({
                                name : name,
                                description : description,
                                company : company
                            })
                            tempdata.save().then(()=>{
                                res.json({
                                    success : true,
                                    message : `Подразделение создан успешно!`
                                })
                            }).catch((err)=>{
                                console.log(err);
                                res.status(500).json({
                                    success : false,
                                    message : "Не удалось создать подразделение"+err
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
                        message : "Не удалось создать профиль клиента" +err
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


let getSingleDivision = (req,res,next)=>{
    //if(req.user.type==='ADMIN'){
        let _id = req.params._id;
        console.log(_id);

        DivisionModel.find({_id : _id,status : 1},{createdBy : 0,status : 0}).then((info)=>{
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
    /*else{
        res.status(401).json({
            success : false,
            message : "Разрешения не предоставлены!"
        })
    }    */

    


let removeDivision = (req,res,next)=>{
    //if(req.user.type==='ADMIN'){
        var _id =  req.body._id;
        DivisionModel.findOneAndUpdate({
            _id : _id
        },{
            status: 0
        }).then(()=>{
            res.json({
                success: true,
                message :  "Подразделение было удалено"
            })
        }).catch((err)=>{
            res.status(500).json({
                success : false,
                message : "Не удалось удалить подразделение"
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

module.exports = { divisiondetails, divisionCreate, getSingleDivision, removeDivision}

