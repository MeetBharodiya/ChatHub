const router = require("express").Router();
const verificationcontoller = require("../controllers/verification-controller")

router.get("/",verificationcontoller.verifyToken);

module.exports=router