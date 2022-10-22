var TestModel = require("../models/Test");
var QuestionModel = require("../models/questions");
var AnswersModel = require("../models/answers");
var MaterialModel = require("../models/materials");
var mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId
 
let getAllJoinedData = (req, res, next) =>{
    console.log("SSSSSSSSSSSSSS", req.body);
    var _materialId = req.params._materialId;
    console.log("Material",_materialId);
    if(_materialId !== null){
        MaterialModel.aggregate([
            {
                $match: 
                { 
                    _id: ObjectId(_materialId),
                }
            },
            {
                $lookup: {
                  from: "questionmodels",
                  localField: "_id",
                  foreignField: "material",
                  as: "ques",     
                },
            },
            {
                $lookup: {
                    from: "testmodels",
                    localField: "_id",
                    foreignField: "materialid",
                    as: "Test",     
                },
            }
        ])
        .exec(function (err, material) {

            if (err){
                console.log(err)
                res.status(500).json({
                    success : false,
                    message : "Не удалось получить данные"
                })
            }
            else{
                res.json({
                    success : true,
                    message : `Успешно`,
                    data : material,
                    // data2 : test
                })   
                
            }
        })   
    }  
    else{
        res.status(500).json({
            success : false,
            message : "Не удалось получить ЬфеукшфШВ" + _materialId
        })
    }
}

let getAllTestQuestions = (req, res, next) =>{

}

module.exports = {getAllJoinedData}