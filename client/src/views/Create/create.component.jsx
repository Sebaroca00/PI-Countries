import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postActivities } from "../../Redux/actions";
import { getCountries } from "../../Redux/actions";
import { useNavigate } from "react-router-dom";
import validate from  './validate';

import "./create.styles.css";

function Create() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.allCountries);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const navigate = useNavigate();
  
  
  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countryCodes: [],
  });
  const [error, setError] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
  });

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  useEffect(() => {
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [countries, searchTerm]);

  const validateForm = () => {
    const newError = validate(input, selectedCountries);
    setError(newError);

    return Object.values(newError).every((val) => val === "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newInput;
    let newSelectedCountries;

    if (name === "countries") {
      const countryCode = countries.find((country) => country.name === value)?.code;
      newSelectedCountries = [...selectedCountries, countryCode];
      setSelectedCountries(newSelectedCountries);
      newInput = { ...input, [name]: newSelectedCountries };
    } else if (name === "search") {
      setSearchTerm(value);
      newInput = input;
    } else {
      newInput = { ...input, [name]: value };
    }

    const newError = validate(newInput, newSelectedCountries || selectedCountries);
    setError(newError);
    setInput(newInput);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      alert("Faltan completar campos");
      return;
    }

    try {
      const formData = {
        ...input,
        countryCodes: selectedCountries,
      };

      await dispatch(postActivities(formData));
      alert("Actividad creada con éxito");
      navigate("/home");
      setInput({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countryCodes: [],
      });
      setSelectedCountries([]);
    } catch (error) {
      console.error("Error al crear actividad:", error);
      alert("Hubo un error al crear la actividad");
    }
  };

  const removeSelectedCountry = (selectedCountry) => {
    setSelectedCountries(
      selectedCountries.filter((country) => country !== selectedCountry)
    );
  };

  return (
    <div className="formConteiner">
      <h1>CREA TU ACTIVIDAD TURÍSTICA</h1>
     
      <form onSubmit={submitHandler}>
        <div className="formdiv">
          <div className="container">
            <label className="label">Nombre</label>
            <input
              name="name"
              className="input"
              value={input.name}
              onChange={handleChange}
              autoComplete="off"
            />
            <span className="errors">{error.name}</span>
          </div>
          <div className="container">
            <label className="label">Dificultad</label>
            <h4>(Debe ser un valor entre 1 y 5)</h4>
            <input
              name="difficulty"
              className="input"
              value={input.difficulty}
              onChange={handleChange}
              autoComplete="off"
            />
            <span className="errors">{error.difficulty}</span>
          </div>
          <div className="container">
            <label className="label">Duración</label>
            <h4>(En horas)</h4>
            <input
              name="duration"
              className="input"
              value={input.duration}
              onChange={handleChange}
              autoComplete="off"
            />
            <span className="errors">{error.duration}</span>
          </div>
          <div className="container">
            <label className="label">Temporada</label>
            <select
              name="season"
              className="input"
              value={input.season}
              onChange={handleChange}
              autoComplete="off"
            >
              <option className="container" value="">Selecciona una temporada</option>
              <option className="container" value="Verano">Verano</option>
              <option className="container" value="Otoño">Otoño</option>
              <option className="container" value="Invierno">Invierno</option>
              <option className="container" value="Primavera">Primavera</option>
            </select>
            <span className="errors">{error.season}</span>
          </div>
          <div className="container">
            <label className="label">Países</label>
            <input
              type="text"
              name="search"
              className="input"
              placeholder="Buscar países..."
              value={searchTerm}
              onChange={handleChange}
              autoComplete="off"
            />
            <select name="countries" className="input" onChange={handleChange}>
              <option className="container" value="">
                Selecciona un país
              </option>
              {filteredCountries.map((country) => (
                <option className="container" key={country.code} value={country.name}>
                  {country.code} - {country.name}
                </option>
              ))}
            </select>
            <span className="errors">{error.country}</span>
          </div>
          <div className="selected-countries">
            <p className="container2">Países Seleccionados:</p>
            <ul>
              {selectedCountries.map((countryCode, index) => (
                <li className="container" key={index}>
                  {countryCode}{" "}
                  <button
                    type="button"
                    onClick={() => removeSelectedCountry(countryCode)}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button className="boton" type="submit">Crear</button>
        </div>
      </form>
    </div>
  );
}

export default Create;
