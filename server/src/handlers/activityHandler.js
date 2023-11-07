const { createActivityDB, getActivities } = require("../controllers/activityController");

const createActivityHandler = async (req, res) => {
    const { name, difficulty, duration, season, countryCodes } = req.body;
  
    try {
      const response = await createActivityDB(name, difficulty, duration, season, countryCodes);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  const getActivitiesHandler = (req, res) => {
    getActivities(req, res);
  };
    

module.exports = {
    createActivityHandler,
    getActivitiesHandler
};
