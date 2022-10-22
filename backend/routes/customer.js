var express = require("express");
var router = express.Router();

var customerservice = require("../services/customer");
//var customerservice2 = require("../services/customerFunctions");

router.post('/create',customerservice.customerCreate);
router.get('/details/all',customerservice.customerdetails);
router.get('/details/:_id',customerservice.getSingleCustomer);
router.post('/remove',customerservice.removeCustomer);


module.exports=router;
