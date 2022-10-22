var mongoose = require("mongoose");
var materialschema = require("../schemas/materials");

var MaterialModel = mongoose.model(`MaterialModel`, materialschema);
module.exports=MaterialModel;