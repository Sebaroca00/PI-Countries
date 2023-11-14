import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getByName, getCountries } from '../../Redux/actions';
import Cards from '../../components/Cards/cards.component';
import NavBar from '../../components/NavBar/navbar.component';
import Pagination from '../../components/Pagination/Pagination';
import './home.styles.css';

function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.allCountries);
  const [searchString, setSearchString] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 10;

  function handleChange(e) {
    e.preventDefault();
    setSearchString(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Restablecer la página actual a 1 al realizar una búsqueda
    setCurrentPage(1);
    if (searchString.trim() === '') {
      dispatch(getCountries());
    } else {
      dispatch(getByName(searchString));
    }
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const getCountriesInCurrentPage = () => {
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const flatAllCountries = allCountries.flat();
    return flatAllCountries.slice(indexOfFirstCountry, indexOfLastCountry);
  };

  return (
    <div className="home">
      <h1 className="home-title">Home</h1>
      <NavBar handleChange={handleChange} handleSubmit={handleSubmit} />
      {allCountries.length > countriesPerPage && (
        <Pagination
          totalPages={Math.ceil(allCountries.flat().length / countriesPerPage)}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
      <Cards countriesInCurrentPage={getCountriesInCurrentPage()} />
      
    </div>
  );
}

export default Home;
