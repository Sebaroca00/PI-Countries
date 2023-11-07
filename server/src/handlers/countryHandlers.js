const { getCountryByName, getCountryById, loadCountriesToDatabase, getAllCountries } = require('../controllers/countryControllers');

const getAllCountriesHandler = async (req, res) => {
    try {
        const countries = await getAllCountries();
        res.status(200).json(countries);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
  };
  

const getCountriesHandler = async (req, res) => {
    const { name } = req.query;

    if (name) {
        try {
            const countries = await getCountryByName(name);
            res.status(200).json(countries);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    } else {
        res.status(200).send('Todos los países');
    }
};

const getDetailHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await getCountryById(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const loadCountriesHandler = async (req, res) => {
    try {
        await loadCountriesToDatabase();
        res.status(200).json({ message: 'Countries loaded to the database' });
    } catch (error) {
        console.error('Error loading countries to the database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getCountriesHandler,
    getDetailHandler,
    loadCountriesHandler,
    getAllCountriesHandler
};