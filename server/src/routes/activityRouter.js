const express = require("express");
const { createActivityHandler, getActivitiesHandler } = require("../handlers/activityHandler");
const router = express.Router();


router.get ('/', getActivitiesHandler);

router.post("/", createActivityHandler);

module.exports = router;

