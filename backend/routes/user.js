var express = require("express");
var router = express.Router();
var userservice  = require("../services/user") || require("../services/customer");

router.get('/details',userservice.userdetails);



module.exports=router;