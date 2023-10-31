const { createActivityDB } = require("../controllers/activityController");

const getCountriesHandler = (req, res) =>{
    const {name} = req.query;
    if (name) res.status(200).send(`aqui esta el pais${name}`)
    res.status(200). send ('todos los paises')
};

const getDetailHandler = (req, res) =>{
    const {id} = req.params;

    res.status(200).send(`detail de ${id}`)
};

const createActivityHandler = async (res, req) => {
    const {name, difficulty, duration, season} = req.body;

    try{
        const response = await createActivityDB(name, difficulty, duration, season)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

module.exports = {
    getCountriesHandler,
    getDetailHandler,
    createActivityHandler
}