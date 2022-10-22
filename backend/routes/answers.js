var express = require("express");
var router = express.Router();

var answer = require("../services/answersFunctions");

//create new Trainer
router.post('/create',answer.createAnswers);
router.get('/details/all',answer.getAllAnswers);
// router.get('/trainer/details/:_id',admin.getSingleTrainer);
// router.post('/trainer/remove',admin.removeTrainer);



module.exports=router;