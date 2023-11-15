import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postActivities } from "../../Redux/actions";
import { getCountries } from "../../Redux/actions";
import Modal from 'react-modal';
import "./create.styles.css";

Modal.setAppElement('#root');

function Create() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.allCountries);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  useEffect(() => {
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [countries, searchTerm]);

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

  const validate = () => {
    const newError = {
      name: "",
      difficulty: "",
      duration: "",
      season: "",
    };

    if (!input.name.trim()) {
      newError.name = "Nombre es requerido";
    }

    if (!input.difficulty.trim()) {
      newError.difficulty = "Dificultad es requerida";
    } else {
      const difficultyValue = parseInt(input.difficulty);
      if (isNaN(difficultyValue) || difficultyValue < 1 || difficultyValue > 5) {
        newError.difficulty = "La dificultad debe estar en el rango de 1 a 5";
      }
    }

    if (!input.duration.trim()) {
      newError.duration = "Duración es requerida";
    } else if (parseFloat(input.duration) > 4) {
      newError.duration = "La duración no puede ser mayor a 4 horas";
    }

    if (!input.season.trim()) {
      newError.season = "Temporada es requerida";
    }

    setError(newError);

    // Devuelve true si no hay errores, de lo contrario, false
    return Object.values(newError).every((val) => val === "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "countries") {
      const countryCode = countries.find((country) => country.name === value)?.code;
      setSelectedCountries([...selectedCountries, countryCode]);
    } else if (name === "search") {
      setSearchTerm(value);
    } else {
      setInput({
        ...input,
        [name]: value,
      });
    }

    validate(); // No es necesario pasar el objeto completo aquí
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    // Validar campos antes de enviar
    if (!validate()) {
      setModalIsOpen(true);
      setSuccessMessage("Faltan completar campos");
      return;
    }

    try {
      const formData = {
        ...input,
        countryCodes: selectedCountries,
      };

      await dispatch(postActivities(formData));
      setSuccessMessage("Actividad creada con éxito");
      setModalIsOpen(true);
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
      setSuccessMessage(""); // Limpia el mensaje de éxito en caso de error
    }
  };

  const removeSelectedCountry = (selectedCountry) => {
    setSelectedCountries(
      selectedCountries.filter((country) => country !== selectedCountry)
    );
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  
  const modalStyle = {
    content: {
      color: successMessage, // Cambia el color del texto según el tipo de mensaje
    },
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
          <button className="boton" type="submit">
          Crear
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Mensaje de éxito"
          className="modal"
          style={modalStyle}
        >
  
          <p className="success-message">{successMessage}</p>
          <button onClick={closeModal}>Aceptar</button>
        </Modal>
        </div>
      </form>
    </div>
  );
}

export default Create;
