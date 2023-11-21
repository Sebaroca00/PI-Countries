function transformCountryData(data) {

        const code = data.cca3 || null;
        const name = data.name ? data.name.common || null : null;
        const flagImage = data.flags ? data.flags.png || null : null;
        const continent = data.region || null;
        const capital = data.capital ? (data.capital[0] || null) : null;
        const subregion = data.subregion || null;
        const area = data.area || null;
        const population = data.population || null;
      
        return {
          code,
          name,
          flagImage,
          continent,
          capital,
          subregion,
          area,
          population,
        };
      }

  
  module.exports = {
    transformCountryData,
  };
  