const {Activity} = require("../db")

const createActivityDB = async (name, difficulty, duration, season ) =>{
  return await Activity.create({name, difficulty, duration, season});
};

module.exports = {
    createActivityDB
}