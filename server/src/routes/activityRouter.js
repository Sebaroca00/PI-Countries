const express = require("express");
const { createActivityHandler, getActivitiesHandler } = require("../handlers/activityHandler"); // Asegúrate de que estás importando el manejador correcto
const router = express.Router();


router.get ('/', getActivitiesHandler);
// Ruta para crear una actividad
router.post("/", createActivityHandler);

module.exports = router;

