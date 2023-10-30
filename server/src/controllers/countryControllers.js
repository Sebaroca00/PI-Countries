const axios = require('axios'); // Importa Axios

const { Country } = require('../db'); // Importa el modelo de país desde tu archivo 'db.js'

const importCountries = async (req, res) => {
  try {
    // Realiza una solicitud a la API de países para obtener datos
    const response = await axios.get('http://localhost:5000/countries'); // Cambia la URL según tu API de países
    const data = response.data;

    // Guarda los países en la base de datos
    await Country.bulkCreate(data);

    res.status(200).json({ message: 'Países importados exitosamente' });
  } catch (error) {
    console.error('Error al importar países:', error);
    res.status(500).json({ error: 'Error al importar países' });
  }
};

module.exports = {
  importCountries,
};
