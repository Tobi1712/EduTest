var mongoose = require("mongoose");
var testschema = require("../schemas/Test");


var TestModel = mongoose.model(`TestModel`,testschema);
module.exports = TestModel;
