const axios = require('axios');
const { Country, Activity } = require('../db');
const { Op } = require('sequelize');
const { transformCountryData } = require('./countryTransformations'); // Importa la función de transformación

const loadCountriesToDatabase = async () => {
  try {
    // Obtener los países desde la API de "countries"
    const response = await axios.get('http://localhost:5000/countries');

    // Recorrer la lista de países y guardarlos en la base de datos
    for (const countryData of response.data) {
      const transformedData = transformCountryData(countryData);

      // Crear un nuevo país en la base de datos
      await Country.create(transformedData);

      console.log(`País "${transformedData.code}" guardado en la base de datos`);
    }
  } catch (error) {
    console.error('Error cargando países en la base de datos:', error);
  }
};

const getAllCountries = async () => {
  try {
    const countries = await Country.findAll({
      include: 'activities', // Usa el alias 'activities' definido en db.js
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    return countries;
  } catch (error) {
    console.error('Error al obtener los países:', error);
    throw error;
  }
};


const getCountryById = async (id) => {
  try {
    // Busca el país por su ID (código de tres letras) e incluye las actividades turísticas asociadas
    const country = await Country.findOne({
      where: { code: id },
      include: [{ model: Activity, as: 'activities' }],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (!country) {
      // Si el país no se encuentra, puedes manejar el error o devolver un mensaje personalizado.
      return { error: 'País no encontrado' };
    }

    // Devuelve el país con sus actividades turísticas
    return country;
  } catch (error) {
    // Maneja cualquier error que pueda ocurrir durante la consulta.
    console.error('Error al obtener el país por ID:', error);
    return { error: 'Error al obtener el país' };
  }
};


const getCountryByName = async (name) => {
  try {
    // Realiza una búsqueda de países que contengan el nombre dado (sin distinción de mayúsculas/minúsculas)
    const countries = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: [
        {
          model: Activity,
          as: 'activities',
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });

    return countries;
  } catch (error) {
    // Maneja cualquier error que pueda ocurrir durante la consulta.
    console.error('Error al obtener los países por nombre:', error);
    throw new Error('Error al obtener los países por nombre');
  }
};


module.exports = {
  loadCountriesToDatabase,
  getAllCountries,
  getCountryByName,
  getCountryById
};