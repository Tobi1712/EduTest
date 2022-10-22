let UserModel = require("../models/user");
let tool = require("./tool");

let trainerRegister = (req,res,next)=>{
    console.log(req.user.type);
    var _id = req.body._id || null;
    console.log('Hio:',req.body);
    //if(req.user.type==='ADMIN'){
        req.check('name', `Недопустимое имя`).notEmpty();
        if(_id==null){
            req.check('password','Неверный пароль').isLength({min : 5,max :6});
            req.check('emailid', ` Неверный адрес электронной почты`).isEmail().notEmpty();
        }
        req.check('contact','Неверный контактный номер').isLength({min : 10,max :13}).isNumeric({no_symbols: false});
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
            var password = req.body.password;
            var emailid =  req.body.emailid;
            var company = req.body.company;
            var contact = req.body.contact;
            if(_id!=null){
                UserModel.findOneAndUpdate({
                    _id : _id,
                    status : 1
                },
                { 
                    name : name,
                    emailid : emailid,
                    contact  : contact,
                    company : company
                }).then(()=>{
                    res.json({
                        success : true,
                        message : `Профиль тренера обновлен успешно!`
                    })
                }).catch((err)=>{
                    res.status(500).json({
                        success : false,
                        message : "Не удалось обновить профиль тренера"
                    })
                })
            }
            else{
                UserModel.findOne({'emailid': emailid,status:1}).then((user)=>{
                    if(!user){
                        tool.hashPassword(password).then((hash)=>{
                            var tempdata = new UserModel({
                                name : name,
                                password : hash,
                                emailid : emailid,
                                company : company,
                                contact  : contact,
                                createdBy : req.user._id
                            })
                            tempdata.save().then(()=>{
                                res.json({
                                    success : true,
                                    message : `Профиль тренера создан успешно!`
                                })
                            }).catch((err)=>{
                                console.log(err);
                                res.status(500).json({
                                    success : false,
                                    message : "Не удалось создать профиль тренера"
                                })
                            })
                        }).catch((err)=>{
                            console.log(err);
                            res.status(500).json({
                                success : false,
                                message : "Не удалось создать профиль тренера"
                            })
                        })
                        
                        
                    }
                    else{
                        res.json({
                            success : false,
                            message : `Этот идентификатор уже существует!`
                        })
                    }
                }).catch((err)=>{
                    res.status(500).json({
                        success : false,
                        message : "Не удалось создать профиль тренера"
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

let removeTrainer = (req,res,next)=>{
    //if(req.user.type==='ADMIN'){
        var _id =  req.body._id;
        UserModel.findOneAndUpdate({
            _id : _id
        },
        {
            status : 0
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
    }
//     else{
//         res.status(401).json({
//             success : false,
//             message : "Разрешения не предоставлены!"
//         })
//     } 
// }







let getAllTrainers = (req,res,next)=>{
    //if(req.user.type==='ADMIN'){
        UserModel.find({type: 'TRAINER', status : 1},{ password: 0, type: 0,createdBy : 0,status : 0 })
        .populate(
            'company', 'name'
        )
        .then((info)=>{
            res.json({
                success : true,
                message : `Успешно`,
                data : info
            })
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



let getSingleTrainer = (req,res,next)=>{
    //if(req.user.type==='ADMIN'){
        let _id = req.params._id;
        console.log(_id);
        UserModel.find({_id : _id,status : 1},{password: 0, type: 0, createdBy : 0,status : 0}).then((info)=>{
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







module.exports = { trainerRegister, getAllTrainers, getSingleTrainer, removeTrainer }