var express = require("express");
var router = express.Router();

var company = require("../services/companyFunctions");

router.post('/create', company.createCompany);
router.get('/details/all', company.companydetails);
router.get('/details/:_id', company.getSingleCompany);
router.post('/remove', company.removeCompany);


module.exports=router;
