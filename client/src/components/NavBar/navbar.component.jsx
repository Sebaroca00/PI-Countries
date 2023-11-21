import React, { useEffect } from "react";
import { useDispatch} from 'react-redux';
import { filterByContinent } from '../../Redux/actions/index';
import { getActivities } from '../../Redux/actions';
import { Link } from 'react-router-dom';
import './navbar.styles.css';

function NavBar({
  handleChange,
  handleSubmit,
  handleActivityFilter,
  activities,
  handleSortChange,
  navSortType,         
  navSortDirection     
})


{  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  const handleContinentFilter = (continent) => {
    dispatch(filterByContinent(continent));
  };
  
  return (
    <div className="navbar">
      <div className="barra">
        <form onChange={handleChange}>
          <input className="barra-input" placeholder="Busqueda" type="search"/>
          <button className="barra-btn" type="submit" onClick={handleSubmit}>
            Buscar
          </button>
        </form>
        </div> 
        <div className="navbar-button">
      <select className="button-filter" onChange={(e) => handleContinentFilter(e.target.value)}>
        <option value="">Todos los continentes</option>
        <option value="Europe">Europa</option>
        <option value="Africa">Africa</option>
        <option value="Americas">America</option>
        <option value="Asia">Asia</option>
        <option value="Oceania">Oceania</option>
        <option value="Antarctic">Antartida</option>

      </select>
      <select className="button-filter" onChange={(e) => handleActivityFilter(e.target.value)}>
        <option  value="">Seleccione una Actividad</option>

        {activities.map((activity) => (
          <option key={activity.id} value={activity.name}>
            {activity.name}
          </option>
        ))}
      </select>
      <button className="button-create">
        <Link to="/create" className="barra-link">
          Crear Actividad
        </Link>
      </button>
      <button className="button-filter" onClick={() => handleSortChange('name')}>
        Ordenar por Nombre {navSortType === 'name' && navSortDirection === 'asc' && '↑'}
        {navSortType === 'name' && navSortDirection === 'desc' && '↓'}
      </button>
      <button className="button-filter" onClick={() => handleSortChange('population')}>
        Ordenar por Población {navSortType === 'population' && navSortDirection === 'asc' && '↓'}
        {navSortType === 'population' && navSortDirection === 'desc' && '↑'}
      </button>
      </div>
   </div>
  );
}

export default NavBar;