const express = require('express');
const { getCountriesHandler, getDetailHandler } = require('../handlers/countryHandlers');

const router = express.Router();

router.get("/", getCountriesHandler);
router.get("/id", getDetailHandler);

module.exports = router;