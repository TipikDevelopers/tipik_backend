const { Router } = require("express");
const { login } = require("../controller/authController/loginHandler");

const router = Router();

router.post("/login", login);

module.exports = router;
