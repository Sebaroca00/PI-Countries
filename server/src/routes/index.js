const { Router } = require('express');
const router = Router();

const countriesRouter = require('./countryRouter'); // Importa el enrutador de países
const activityRouter = require('./activityRouter');   // Importa el enrutador de actividades

// Usa los enrutadores para las rutas relacionadas
router.use('/countries', countriesRouter);
router.use('/activity', activityRouter);

module.exports = router;
