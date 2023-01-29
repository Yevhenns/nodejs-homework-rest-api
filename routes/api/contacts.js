const express = require("express");
const router = express.Router();

const { ctrlWrapper } = require("../../middlewares");

const { contacts: ctrl } = require("../../controllers");

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.remove));

router.put("/:contactId", ctrlWrapper(ctrl.update));

router.patch("/:contactId/favorite", ctrlWrapper(ctrl.favorite));

module.exports = router;
