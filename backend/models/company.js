var mongoose = require("mongoose");
var companyschema = require("../schemas/company");

var CompanyModel = mongoose.model(`CompanyModel`,companyschema);
module.exports=CompanyModel;