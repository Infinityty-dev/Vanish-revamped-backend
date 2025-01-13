const express = require("express");
const { userMovementPlan } = require("../controllers/userMovementAndServiceOptionsDetailsController.js");
const router = express.Router();

router.route("/newMovementAndServiceDetail/:id").post(userMovementPlan);

module.exports = router;
