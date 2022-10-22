var express = require("express");
var router = express.Router();

var questions = require("../services/trainerFunctions");


router.post('/create',questions.createQuestion);
router.post('/details/all/:_materialId',questions.getAllQuestions);
router.get('/details/:_id',questions.getSingleQuestion);
router.post('/delete',questions.deleteQuestion);
router.post('/deleteimage', questions.deleteImage);



module.exports=router;

