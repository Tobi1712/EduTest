var mongoose = require("mongoose");
var chapterschema = require("../schemas/chapter");

var ChapterModel = mongoose.model(`ChapterModel`, chapterschema);
module.exports=ChapterModel;