const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Country = sequelize.define('Country', {
    code: {
      type: DataTypes.STRING(3), // Código de tres letras
      allowNull: false,
      primaryKey: true, 
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flagImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subregion: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    area: {
      type: DataTypes.FLOAT, 
      allowNull: true, 
    },
    population: {
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
  });


  return Country;
};
