// let CustomerModel = require("../models/customer");
let UserModel = require("../models/user");
let tool = require("./tool");

let customerdetails = (req,res,next)=>{
    console.log(req.user.type);
    if(req.user.type!=='CUSTOMER'){
        UserModel.find({type:'CUSTOMER', status : 1},{password:0,createdAt: 0, updatedAt : 0})
        .populate(
            'company', 'name'
        )
        .populate(
            'division', 'name'
        )
        
        .exec(function (err, customer) {
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
                    data : customer
                })   
            }
        })        
    }
    else{
                res.status(401).json({
                    success : false,
                    message : "Разрешения не предоставлены!"
                })
            }
        
}


let customerCreate = (req,res,next)=>{
    console.log(req.user.type);
    var _id = req.body._id || null;
            //    if(req.user.type==='CUSTOMER'){
        
        if(_id==null){
           
            // req.check('password','Неверный пароль').isLength({min : 5,max :6});
            req.check('emailid', `Неверный адрес электронной почты`).isEmail().notEmpty();
        }
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
            var name =  req.body.name;
            var emailid =  req.body.emailid;
            var password = req.body.password;
            var avatar = req.body.avatar;
            var company = req.body.company;
            var division = req.body.division;
            var type = req.body.type;
            
            if(_id!=null){
                UserModel.findOneAndUpdate({
                    _id : _id,
                    status : 1
                },
                { 
                    name : name,
                    emailid : emailid,
                    avatar : avatar,
                    company : company,
                    division : division,
                    type : 'CUSTOMER'
                }).then(()=>{
                    res.json({
                        success : true,
                        message : `Профиль пользователя успешно обновлен!`
                    })
                }).catch((err)=>{
                    res.status(500).json({
                        success : false,
                        message : "Не удалось обновить профиль пользователя" + err
                    })
                })
            }
            else{
                UserModel.findOne({'emailid':emailid, status:1}).then((user)=>{
                    if(!user){
                        tool.hashPassword(password).then((hash)=>{
                            var tempdata = new UserModel({
                                name : name,
                                password : hash,
                                emailid : emailid,
                                avatar: avatar,
                                company: company,
                                division : division,
                                type : 'CUSTOMER'
                            })
                            tempdata.save().then(()=>{
                                res.json({
                                    success : true,
                                    message : `Профиль пользователя успешно создан!`
                                })
                            }).catch((err)=>{
                                console.log(err);
                                res.status(500).json({
                                    success : false,
                                    message : "Не удалось создать профиль пользователя" + err
                                })
                            })
                        }).catch((err)=>{
                            console.log(err);
                            res.status(500).json({
                                success : false,
                                message : "Не удалось создать профиль пользователя"
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
                        message : "Не удалось создать профиль пользователя" + err
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


let getSingleCustomer = (req,res,next)=>{
    //if(req.user.type==='ADMIN'){
        let _id = req.params._id;
        console.log(_id);

        UserModel.find({_id : _id,status : 1},{password:0, createdBy : 0,status : 0}).then((info)=>{
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

    


let removeCustomer = (req,res,next)=>{
    //if(req.user.type==='ADMIN'){
        var _id =  req.body._id;
        UserModel.findOneAndUpdate({
            _id : _id
        },{
            status: 0
        }).then(()=>{
            res.json({
                success: true,
                message :  "Учетная запись была удалена"
            })
        }).catch((err)=>{
            res.status(500).json({
                success : false,
                message : "Не удалось удалить учетную запись"
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

module.exports = { customerdetails, customerCreate, getSingleCustomer, removeCustomer}

