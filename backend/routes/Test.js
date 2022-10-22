var express = require("express");
var router = express.Router();

var Test = require("../services/Test");

router.post('/create', Test.TestCreate);
router.get('/details/all/:_materialId', Test.TestAllDetails);
router.get('/details/:_id', Test.getSingleTestHistory);
router.post('/update', Test.updateTest);
// router.post('/delete', slides.deleteSlide);


module.exports=router;
