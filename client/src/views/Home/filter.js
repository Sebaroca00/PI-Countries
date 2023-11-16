
export const applyFilters = (countries, continentFilter, selectedActivity) => {
    return countries
      .flat()
      .filter((country) => !continentFilter || country.continent === continentFilter)
      .filter((country) =>
        !selectedActivity ||
        country.activities.some((activity) => activity.name === selectedActivity)
      );
  };