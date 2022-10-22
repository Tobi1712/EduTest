var express = require("express");
var router = express.Router();

var materials = require("../services/materials");

router.post('/create', materials.createMaterial);
router.post('/details/all/:_chapterId', materials.getAllMaterials);
router.get('/details/:_id', materials.getSingleMaterial);
router.post('/delete', materials.deleteMaterial);
router.post('/update', materials.updateMaterial);


module.exports=router;
