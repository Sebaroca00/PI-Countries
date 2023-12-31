import "./detail.styles.css";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getByDetail } from '../../Redux/actions';

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detailedCountry = useSelector((state) => state.detailedCountry);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    dispatch(getByDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    const selectedCountry = detailedCountry;
    if (selectedCountry) {
      setCountry(selectedCountry);
    }
  }, [detailedCountry]);

  return (
    <div className="detail-container">
      {country && (
        <div className="detail-content">
          <h3 className="detail-header2">Más información de:</h3>
          <h1 className="detail-header">{country.name}</h1>
          <img className="detail-image" src={country.flagImage} alt={`Bandera de ${country.name}`} />
          <div className="detail-info">
            <p>ID: {country.code}</p>
            <p>Continente: {country.continent || 'Información no disponible'}</p>
            <p>Capital: {country.capital || 'Información no disponible'}</p>
            <p>Subregión: {country.subregion || 'Información no disponible'}</p>
            <p>Área: {country.area ? `${country.area} km²` : 'Información no disponible'}</p>
            <p>Población: {country.population ? `${country.population} habitantes` : 'Información no disponible'}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
