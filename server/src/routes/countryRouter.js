const express = require('express');
const { getCountriesHandler, getDetailHandler, loadCountriesHandler, getAllCountriesHandler } = require('../handlers/countryHandlers');

const router = express.Router();
//GET
router.get('/', getAllCountriesHandler);
router.get("/name", getCountriesHandler);
router.get("/:id", getDetailHandler);
//POST
router.post('/load', loadCountriesHandler); // Ruta para cargar los países a la base de datos

module.exports = router;
