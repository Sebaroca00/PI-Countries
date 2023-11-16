import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getByName, getCountries, filterByActivity, getActivities } from '../../Redux/actions';
import { sortByName, sortByPopulation } from './sort';
import { applyFilters } from './filter'; 
import Cards from '../../components/Cards/cards.component';
import NavBar from '../../components/NavBar/navbar.component';
import Pagination from '../../components/Pagination/Pagination';
import './home.styles.css';

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

  const getSortedCountries = (countries) => {
    return homeSortType === 'name'
      ? sortByName(countries, homeSortDirection)
      : sortByPopulation(countries, homeSortDirection);
  };

  const handleActivityFilter = (activity) => {
    setSelectedActivity(activity);
    dispatch(filterByActivity(activity));
  };

  const handleSortChange = (type) => {
    setHomeSortType(type);
    setHomeSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
  };

  const handleChange = (e) => {
    setSearchString(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(searchString.trim() === '' ? getCountries() : getByName(searchString));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const getCountriesInCurrentPage = () => {
    const filteredCountries = applyFilters(allCountries, continentFilter, selectedActivity);
    const sortedCountries = getSortedCountries(filteredCountries);
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;

    return sortedCountries.slice(indexOfFirstCountry, indexOfLastCountry);
  };

  const totalPages = Math.ceil(applyFilters(allCountries, continentFilter, selectedActivity).length / countriesPerPage);

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
