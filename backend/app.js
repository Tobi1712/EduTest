const PORT = process.env.PORT || 5000
var createError = require('http-errors');
var express = require('express');
const helmet = require('helmet')
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
const expressValidator = require('express-validator');
var passport = require("./services/passportconf");
var tool = require("./services/tool");
var app = express();


app.use(helmet());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access-control-allow-origin");
    next();
});

app.use(expressValidator());
//import other files
var mongoose = require("./services/connection");
var admin = require("./routes/admin");
var login = require("./routes/login");
var user = require("./routes/user");
var customer = require("./routes/customer");
var division = require("./routes/division");
var company = require("./routes/company");
var chapter = require("./routes/chapter");
var slides = require("./routes/slides");
var materials = require("./routes/materials");
// var universal = require("./routes/universal");
var question = require("./routes/questions");
// var answers = require("./routes/answers");
// var mytest = require("./routes/mytest");
var Test = require("./routes/Test");
var up = require("./routes/fileUpload");
var crtest = require("./routes/crtest");
// var trainee = require("./routes/trainee");
// var stopRegistration = require("./routes/stopRegistration");
// var results = require("./routes/results");
var dummy = require("./routes/dummy");












//configs
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api/v1/createadmin", tool.createadmin);

//passport
app.use(passport.initialize());
app.use(passport.session());


//bind routes
app.use("/api/v1/admin",passport.authenticate('user-token', { session : false }),admin);
app.use("/api/v1/user",passport.authenticate('user-token', { session : false }),user);
app.use("/api/v1/customer",passport.authenticate('user-token', { session : false }),customer);
app.use("/api/v1/company",passport.authenticate('user-token', { session : false }),company);
app.use("/api/v1/division",passport.authenticate('user-token', { session : false }),division);
app.use("/api/v1/slides",passport.authenticate('user-token', { session : false }),slides);
app.use("/api/v1/materials",passport.authenticate('user-token', { session : false }),materials);
app.use("/api/v1/chapter",passport.authenticate('user-token', { session : false }),chapter);
// app.use('/api/v1/subject',passport.authenticate('user-token', { session : false }),universal);
app.use('/api/v1/questions',passport.authenticate('user-token', { session : false }),question);
app.use('/api/v1/Test',passport.authenticate('user-token', { session : false }),Test);
// app.use('/api/v1/answers',passport.authenticate('user-token', { session : false }),answers);
// app.use('/api/v1/mytest',passport.authenticate('user-token', { session : false }),mytest);
app.use('/api/v1/crtest',passport.authenticate('user-token', { session : false }),crtest);
app.use('/api/v1/upload',passport.authenticate('user-token', { session : false }),up);
// app.use('/api/v1/trainer',passport.authenticate('user-token', { session : false }),stopRegistration);
// app.use('/api/v1/trainee',trainee);
// app.use('/api/v1/final',results);
app.use('/api/v1/lala',dummy);







app.use('/api/v1/login',login);

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/public/index.html'));
});




//error handlings
app.use(function(req, res, next) {
    next(createError(404,"Invalid API. Use the official documentation to get the list of valid APIS."));
});

app.use((err, req, res, next)=>{
    console.log(err);
    res.status(err.status).json({
        success : false,
        message : err.message
    });
});




app.listen(PORT,(err)=>{
    if(err){
      console.log(err);
    }
    console.log(`Server Started. Server listening to port ${PORT}`);
});