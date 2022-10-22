var express = require("express");
var router = express.Router();

var slides = require("../services/slides");

router.post('/create', slides.createSlide);
router.get('/details/all/:_materialId', slides.getAllSlides);
router.get('/details/:_id', slides.getSingleSlide);
router.post('/delete', slides.deleteSlide);


module.exports=router;
