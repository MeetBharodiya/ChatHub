const router = require("express").Router();
const authcontroller = require("../controllers/auth-controller")
const chatcontroller = require("../controllers/chat-controller")
const verifyuser = require("../middleware/verifyuser")

router.post("/",verifyuser,chatcontroller.getChat);
router.post("/signup",authcontroller.signup);
router.post("/login",authcontroller.login);

module.exports=router;