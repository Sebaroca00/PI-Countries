import React, { useState, useEffect } from 'react';
import Card from '../Card/card.component';
import './cards.styles.css';


function Cards({ countriesInCurrentPage, continentFilter, activityFilter }) {
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    console.log('Continent seleccionado:', continentFilter);
    const result = continentFilter
      ? countriesInCurrentPage.filter((country) => {
          console.log('continent del país:', country.continent);
          return country.continent === continentFilter;
        })
      : countriesInCurrentPage;

    if (activityFilter) {
      const countriesWithActivity = result.filter((country) => {
        const countryActivities = country.activities || [];
        return countryActivities.some((a) => a.name === activityFilter);
      });
      setFilteredCountries(countriesWithActivity);
    } else {
      setFilteredCountries(result);
    }
  }, [countriesInCurrentPage, continentFilter, activityFilter]);

  return (
    <div className='card-List'>
      {filteredCountries.map((country) => (
        <Card key={country.code} countryData={country} />
      ))}
    </div>
  );
}

export default Cards;
