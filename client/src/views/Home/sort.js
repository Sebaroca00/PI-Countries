
export const sortByName = (countries, direction) => {
    return [...countries].sort((a, b) => {
      const factor = direction === 'asc' ? 1 : -1;
      return factor * a.name.localeCompare(b.name);
    });
  };
  

  export const sortByPopulation = (countries, direction) => {
    return [...countries].sort((a, b) => {
      const factor = direction === 'asc' ? 1 : -1;
      return factor * (a.population - b.population);
    });
  };
  