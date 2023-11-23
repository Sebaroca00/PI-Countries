const validate = (input, selectedCountries) => {
  const newError = {
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    country: "",
  };

  if (!input.name.trim()) {
    newError.name = "Nombre es requerido";
  } else if (input.name.length < 5) {
    newError.name = "El nombre debe tener al menos 5 caracteres";
  } else if (!/^[a-zA-Z\s]+$/.test(input.name)) {
    newError.name = "El nombre debe contener solo letras y espacios";
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

  if (selectedCountries.length === 0) {
    newError.country = "Selecciona al menos un país";
  }

  return newError;
};


export default validate;