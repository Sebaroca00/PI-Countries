const axios = require('axios');
const { Country, Activity } = require('../db');
const { Op } = require('sequelize');
const { transformCountryData } = require('./countryTransformations'); 

const loadCountriesToDatabase = async () => {
  try {
  
    const response = await axios.get('http://localhost:5000/countries');
    for (const countryData of response.data) {
      const transformedData = transformCountryData(countryData);
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
      include: 'activities',
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
    const country = await Country.findOne({
      where: { code: id },
      include: [{ model: Activity, as: 'activities' }],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (!country) {
      return { error: 'País no encontrado' };
    }
    return country;
  } catch (error) {
    console.error('Error al obtener el país por ID:', error);
    return { error: 'Error al obtener el país' };
  }
};


const getCountryByName = async (name) => {
  try {
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