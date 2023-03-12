const express = require("express");
const router = express.Router();

const { auth, upload, ctrlWrapper } = require("../../middlewares");

const { users: ctrl } = require("../../controllers");
router.get("/current", auth, ctrlWrapper(ctrl.current));

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
