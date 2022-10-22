var mongoose = require("mongoose");
var customerschema = require("../schemas/customer");


var CustomerModel = mongoose.model(`CustomerModel`,customerschema);
module.exports = CustomerModel;

