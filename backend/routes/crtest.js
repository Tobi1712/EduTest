var express = require("express");
var router = express.Router();

var tst = require("../services/createTestFunc");

router.post('/create',tst.createRandAnswers);
router.get('/details/all/:_materialId',tst.getAllAnswers1);
router.post('/update', tst.updateAnswer);
// router.get('/details/all',division.divisiondetails);
// router.get('/details/:_id',division.getSingleDivision);
// router.post('/remove',division.removeDivision);


module.exports=router;
