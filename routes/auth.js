const { Router } = require("express");
const { login } = require("../controller/authController/loginHandler");
const { register } = require("../controller/authController/registerHandler");
const {
  verifyCode,
} = require("../controller/authController/verifyCodeHandler");

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/verifyCode", verifyCode);

module.exports = router;
