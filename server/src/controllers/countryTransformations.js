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
    /*} if {
     // console.log('Los datos requeridos del país no están definidos para este objeto:', data);

      if (!data.cca3) {
        console.log('El campo "cca3" no está definido en los datos del país.');
      }
      if (!data.name) {
        console.log('El campo "name" no está definido en los datos del país.');
      }
      if (!data.flags) {
        console.log('El campo "flags" no está definido en los datos del país.');
      }
      if (!data.region) {
        console.log('El campo "region" no está definido en los datos del país.');
      }
    //  if (!data.capital) {
     //   console.log('El campo "capital" no está definido en los datos del país.');
    //  }
      if (!data.population) {
        console.log('El campo "population" no está definido en los datos del país.');
      }
    }
  */
   
  

  
  module.exports = {
    transformCountryData,
  };
  