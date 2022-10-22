var express = require("express");
var router = express.Router();

var mytest = require("../services/MytestFunctions");

//create new Trainer
// router.post('/trainer/create',admin.trainerRegister);
router.get('/details/:_materialId/:_testId',mytest.getAllJoinedData);
// router.get('/trainer/details/:_id',admin.getSingleTrainer);
// router.post('/trainer/remove',admin.removeTrainer);



module.exports=router;