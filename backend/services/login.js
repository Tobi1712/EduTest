let UserModel = require("../models/user");
var passport = require("../services/passportconf");
var jwt = require('jsonwebtoken');
var config = require('config');




let userlogin = (req,res,next)=>{
    req.check('emailid', ` Неверный адрес электронной почты`).isEmail().notEmpty();
    req.check('password','Неверный пароль').isLength({min : 5,max :6});
    var errors = req.validationErrors()
    console.log(errors);
    if(errors){
        res.json({
            success : false,
            message : 'Недопустимые входные данные',
            errors : errors
        })
    }else{
        passport.authenticate('login',{session:false},(err,user,info)=>{
            if(err || !user){
               res.json(info);
            }
            else{
                req.login({_id:user._id}, {session: false}, (err) => {
                    if (err) {
                        res.json({
                            success: false,
                            message: "Ошибка сервера"
                        });
                    }
        
                    var token = jwt.sign({_id:user._id},config.get('jwt.secret'),{expiresIn: 5000000});
                    res.json({
                        success: true,
                        message: "login successful",
                        user: {
                            name : user.name,
                            type: user.type,
                            _id : user._id,
                            emailid : user.emailid,
                            contact : user.contact
                        },
                        token: token
                    });
                });
            }
            })(req,res,next);     
    }
        
}



     
module.exports = { userlogin };

