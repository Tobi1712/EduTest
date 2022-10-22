var UserModel = require("../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;

// var hashPassword = (password)=>{
//    return (new Promise((resolve,reject)=>{
//        bcrypt.hash(password, saltRounds).then(function(hash) {
//            resolve(hash);
//        }).catch((err)=>{
//            reject(err);
//        })
//    }))
//}






            console.log("user dddd")


 



const salt = bcrypt.genSaltSync(saltRounds);
const hash2 = bcrypt.hashSync("admin", salt);


            console.log(hash2)

//    bcrypt.hash("admin", saltRounds).then((hash)=>{

            console.log("user ddddsss")
        var tempdata = new UserModel({
            name : 'rupali',
            password : hash2,
            emailid : 'periwal.rupali@gmail.com',
            contact : '9563152391',
            type: 'ADMIN',
        })


        tempdata.save().then(()=>{
            console.log("user created")
        }).catch((err)=>{
            console.log("err1",err);
        })
//    }).catch((err)=>{
//        console.log("err2",err)
//    })




