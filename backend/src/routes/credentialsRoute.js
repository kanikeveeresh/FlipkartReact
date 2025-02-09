const express = require("express");
const { saveCred } = require("../controllers/credentialsController.js");
const { checkMail } = require("../controllers/checkMailController.js");
const { checkMailandPass } = require("../controllers/checkMailandPass.js")

const router = express.Router();

router.post("/checkEmail", checkMail);
router.post("/checkEmailandPass", checkMailandPass)
router.post("/save", saveCred);

module.exports = router;