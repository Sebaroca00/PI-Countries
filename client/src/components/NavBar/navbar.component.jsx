import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.styles.css';

function Navbar({handleChange, handleSubmit}) {
  return (
    <div className= "conteiner">
    <div className="barra">
        <form onChange={handleChange}>
            <input className="barra-input" placeholder="Busqueda" type="search"/>
            <button className="barra-btn" type="submit" onClick={handleSubmit}>
              Buscar
            </button> 
      </form>
    </div>

            <button className='button-create'>
                <Link to="/create" className="barra-link">
                 Crear Actividad
              </Link>
            </button>
      </div>
  );
}

export default Navbar;