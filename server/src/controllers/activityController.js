const {Activity, Country} = require("../db")


const createActivityDB = async (name, difficulty, duration, season, countryCodes) => {
  try {
    const activity = await Activity.create({ name, difficulty, duration, season });

    if (countryCodes && Array.isArray(countryCodes)) {
      // Asociar la actividad con los países
      const countries = await Country.findAll({ where: { code: countryCodes } });
      await activity.setCountries(countries);
    }

    return activity;
  } catch (error) {
    throw error;
  }
};

const getActivities = async (req, res) => {
  try {
    const activities = await Activity.findAll({
      attributes: { exclude: ['updatedAt'] }, // Excluye el campo 'updatedAt'
      include: [
        {
          model: Country,
          as: 'countries',
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
    createActivityDB,
    getActivities
}