var mongoose = require("mongoose");
var divisionschema = require("../schemas/division");


var DivisionModel = mongoose.model(`DivisionModel`,divisionschema);
module.exports = DivisionModel;

