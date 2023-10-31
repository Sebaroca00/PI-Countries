const express = require("express");
const { createActivityHandler } = require("../handlers/activityHandler"); // Asegúrate de que estás importando el manejador correcto
const router = express.Router();

// Ruta para crear una actividad
router.post("/", createActivityHandler);

module.exports = router;

