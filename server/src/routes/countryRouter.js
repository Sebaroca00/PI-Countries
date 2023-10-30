const express = require('express');
const router = express.Router();
const { Country } = require('../db');

router.get('/', async (req, res) => {
  try {
    const countries = await Country.findAll();
    res.json(countries);
  } catch (error) {
    console.error('Error al consultar países:', error);
    res.status(500).json({ error: 'Error al consultar países' });
  }
});

module.exports = router;