import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getByName, getCountries, filterByContinent, filterByActivity } from '../../Redux/actions';
import { getActivities } from '../../Redux/actions';
import Cards from '../../components/Cards/cards.component';
import NavBar from '../../components/NavBar/navbar.component';
import Pagination from '../../components/Pagination/Pagination';
import './home.styles.css';

// Importaciones (asegúrate de tener todas las importaciones necesarias)

const countriesPerPage = 10;

function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.allCountries);
  const activities = useSelector((state) => state.activities);
  const continentFilter = useSelector((state) => state.filters.continent);

  const [searchString, setSearchString] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [homeSortType, setHomeSortType] = useState('name');
  const [homeSortDirection, setHomeSortDirection] = useState('asc');

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [continentFilter, selectedActivity, homeSortType, homeSortDirection]);

  const handleSortChange = (type) => {
    if (homeSortType === type) {
      setHomeSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
    } else {
      setHomeSortType(type);
      setHomeSortDirection('asc');
    }
  };

  const handleChange = (e) => {
    setSearchString(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    if (searchString.trim() === '') {
      dispatch(getCountries());
    } else {
      dispatch(getByName(searchString));
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleActivityFilter = (activity) => {
    setSelectedActivity(activity);
    dispatch(filterByActivity(activity));
  };

  const getCountriesInCurrentPage = () => {
    const filteredCountries = applyFilters(); // Aplicar los filtros
    const sortedCountries = getSortedCountries(filteredCountries); // Obtener países ordenados
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;

    return sortedCountries.slice(indexOfFirstCountry, indexOfLastCountry);
  };

  const applyFilters = () => {
    let result = allCountries.flat();

    if (continentFilter) {
      result = result.filter((country) => country.continent === continentFilter);
    }

    if (selectedActivity) {
      result = result.filter((country) =>
        country.activities.some((activity) => activity.name === selectedActivity)
      );
    }

    return result;
  };

  const getSortedCountries = (countries) => {
    return [...countries].sort((a, b) => {
      const factor = homeSortDirection === 'asc' ? 1 : -1;
      if (homeSortType === 'name') {
        return factor * a.name.localeCompare(b.name);
      } else if (homeSortType === 'population') {
        return factor * (a.population - b.population);
      }
      return 0;
    });
  };

  const totalPages = Math.ceil(applyFilters().length / countriesPerPage);

  return (
    <div className="home">
      <h1 className="home-title">Home</h1>
      <NavBar
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleActivityFilter={handleActivityFilter}
        activities={activities}
        handleSortChange={handleSortChange}
        navSortType={homeSortType}
        navSortDirection={homeSortDirection}
      />

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}

      <Cards
        countriesInCurrentPage={getCountriesInCurrentPage()}
        continentFilter={continentFilter}
        activityFilter={selectedActivity}
      />
    </div>
  );
}

export default Home;
