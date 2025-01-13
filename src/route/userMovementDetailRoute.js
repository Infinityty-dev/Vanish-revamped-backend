const express = require("express");
const { userMovementPlan } = require("/Vanish-revamped-backend/src/controllers/userMovementAndServiceOptionsDetailsController.js");
const router = express.Router();

router.route("/newMovementAndServiceDetail/:id").post(userMovementPlan);

module.exports = router;
