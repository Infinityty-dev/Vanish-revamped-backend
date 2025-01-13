const express = require("express");
const router = express.Router();
const { userMovementPlan } = require("../UserMovementAndServiceOptionsDetailsController.js");

// router.route("/newMovementAndServiceDetail/:id").post(userMovementPlan);
router.post("/newMovementAndServiceDetail/:id",userMovementPlan)


module.exports = router;
