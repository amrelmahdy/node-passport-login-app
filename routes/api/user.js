const express = require("express");
const router = express.Router();
const { validateBody, schemas } = require("./../../helpers/routeHelper");
const userController = require("./../../controllers/api/user");


router.route("/register")
    .post(validateBody(schemas.registerSchema), userController.register);


router.route("/login")
    .post(userController.login);


router.route("/secret")
    .get(userController.secret);


module.exports = router;