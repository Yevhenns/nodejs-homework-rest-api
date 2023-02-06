const express = require("express");
const router = express.Router();

const { auth, ctrlWrapper } = require("../../middlewares");

const { users: ctrl } = require("../../controllers");

router.get("/current", auth, ctrlWrapper(ctrl.current));

module.exports = router;
