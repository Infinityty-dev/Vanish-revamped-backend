const express = require("express");
const router = express.Router();
const { userMovementPlan } = require("../UserMovementAndServiceOptionsDetailsController.js");

router.route("/newMovementAndServiceDetail/:id").post(userMovementPlan);

module.exports = router;
