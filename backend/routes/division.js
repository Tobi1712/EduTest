var express = require("express");
var router = express.Router();

var division = require("../services/divisionFunctions");

router.post('/create',division.divisionCreate);
router.get('/details/all',division.divisiondetails);
router.get('/details/:_id',division.getSingleDivision);
router.post('/remove',division.removeDivision);


module.exports=router;
