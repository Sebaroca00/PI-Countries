const { createActivityDB } = require("../controllers/activityController");

const createActivityHandler = async (req, res) => { // Reordena los parámetros req y res
    const { name, difficulty, duration, season } = req.body;

    try {
        const response = await createActivityDB(name, difficulty, duration, season);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createActivityHandler
};
