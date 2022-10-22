var mongoose = require("mongoose");
var slidesschema = require("../schemas/slides");

var slides = mongoose.model(`Slides`, slidesschema);
module.exports=slides;