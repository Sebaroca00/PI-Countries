const express = require('express');
const { getCountriesHandler, getDetailHandler, loadCountriesHandler, getAllCountriesHandler } = require('../handlers/countryHandlers');

const router = express.Router();

router.get('/', getAllCountriesHandler);
router.get("/name", getCountriesHandler);
router.get("/:id", getDetailHandler);

router.post('/load', loadCountriesHandler);

module.exports = router;
