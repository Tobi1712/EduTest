var express = require("express");
var router = express.Router();

var chapter = require("../services/chapterFunctions");

router.post('/create', chapter.createChapter);
router.get('/details/all', chapter.chapterdetails);
router.get('/details/:_id', chapter.getSingleChapter);
router.post('/remove', chapter.removeChapter);


module.exports=router;
