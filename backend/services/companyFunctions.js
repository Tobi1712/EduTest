let CompanyModel = require("../models/company");
var moment = require('moment');


let companydetails = (req,res,next)=>{

    CompanyModel.find({status : 1},{createdAt: 0, updatedAt : 0})
    /*.populate(
         'division', 'name'
    )*/
    .exec(function (err, company) {
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
                data : company
            })   
        }
    })        
}


let createCompany = (req,res,next)=>{
    // var dateFormat = require('dateformat');
    console.log(req.user.type);
    var _id = req.body._id || null;
//    if(req.user.type==='CUSTOMER'){
        req.check('name', `Недопустимое имя`).notEmpty();
        /*if(_id==null){
            req.check('emailid', ` Invalid email address`).isEmail().notEmpty();
        }*/
        // console.log(req.body);
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
            var logo =  req.body.logo;
            var descr = req.body.descr;
            //var licFromDate = req.body.licFromDate;
            var licFromDate = req.body.licFromDate;
            // var licFromDate = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
            var licToDate = req.body.licToDate;
            var numOfLic = req.body.numOfLic;
            var numOfLicAcc = req.body.numOfLicAcc;
            var contact = req.body.contact;
            console.log("fd",licFromDate);
            if(_id!=null){
                CompanyModel.findOneAndUpdate({
                    _id : _id,
                    status : 1
                },
                { 
                    name : name,
                    logo : logo,
                    descr : descr,
                    licFromDate : licFromDate,
                    licToDate : licToDate,
                    numOfLic : numOfLic,
                    numOfLicAcc : numOfLicAcc,
                    contact : contact
                }).then(()=>{
                    res.json({
                        success : true,
                        message : `Данные компании успешно обновлены!`
                    })
                }).catch((err)=>{
                    res.status(500).json({
                        success : false,
                        message : "Не удалось обновить данные компании"+err
                    })
                })
            }
            else{
                CompanyModel.findOne({'name':name, status:1}).then((user)=>{
                    if(!user){
                            var tempdata = new CompanyModel({
                                
                                name : name,
                                logo : logo,
                                descr : descr,
                                licFromDate : licFromDate,
                                licToDate : licToDate,
                                numOfLic : numOfLic,
                                numOfLicAcc : numOfLicAcc,
                                contact : contact
                            })
                            tempdata.save().then(()=>{
                                res.json({
                                    success : true,
                                    message : `Профиль компании создан успешно!`
                                })
                            }).catch((err)=>{
                                console.log(err);
                                res.status(500).json({
                                    success : false,
                                    message : "Не удалось создать профиль компании"+err
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
                        message : "Не удалось создать профиль компании" +err
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

let getSingleCompany = (req,res,next)=>{
    //if(req.user.type==='ADMIN'){
        let _id = req.params._id;
        console.log(_id);

        CompanyModel.find({_id : _id,status : 1},{createdBy : 0,status : 0}).then((info)=>{
            if(info.length === 0){
                res.json({
                    success : false,
                    message : `Этой компании не существует!`,
                
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

    


let removeCompany = (req,res,next)=>{
    //if(req.user.type==='ADMIN'){
        var _id =  req.body._id;
        CompanyModel.findOneAndUpdate({
            _id : _id
        },{
            status: 0
        }).then(()=>{
            res.json({
                success: true,
                message :  "Компания была удалена"
            })
        }).catch((err)=>{
            res.status(500).json({
                success : false,
                message : "Невозможно удалить компанию"
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

module.exports = { companydetails, createCompany, getSingleCompany, removeCompany}

