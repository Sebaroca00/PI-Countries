import axios from 'axios';

export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_BY_NAME = 'GET_BY_NAME';
export const GET_BY_DETAIL = 'GET_BY_DETAIL';
export const GET_ACTIVITY = 'GET_ACTIVITY';
export const FILTER_BY_ACTIVITY = 'FILTER_BY_ACTIVITY';
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT'
export const ORDER_BY = 'ORDER_BY';
export const POST_ACTIVITIES = 'POST_ACTIVITIES';

export const getCountries = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3001/countries');
    console.log(response.data);
    dispatch({
      type: GET_COUNTRIES,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error al obtener los países:', error);
  }
};

export const getByName = (name) => async (dispatch) => {
  try {
    if (name.trim() === '') {
      dispatch(getCountries());
    } else {
      const response = await axios.get(`http://localhost:3001/countries/name?name=${name}`);
      dispatch({
        type: GET_BY_NAME,
        payload: response.data,
      });
    }
  } catch (error) {
    console.error('Error al buscar por nombre:', error);
  }
};

export const getByDetail = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3001/countries/${id}`);
    dispatch({
      type: GET_BY_DETAIL,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error al obtener los detalles del país:', error);
  }
};

export const getActivities = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3001/activities');
    dispatch({
      type: GET_ACTIVITY,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error al obtener las actividades:', error);
  }
};

export const filterByContinent = (continent) => ({
  type: FILTER_BY_CONTINENT,
  payload: { continent },
});

export const filterByActivity = (activity) => ({
  type: FILTER_BY_ACTIVITY,
  payload: { activity },
});

export const orderBy = (field, direction) => ({
  type: ORDER_BY,
  payload: { field, direction },
});


export const postActivities = (payload) => async () => {
  try {
    const response = await axios.post('http://localhost:3001/activities', payload);
    console.log('Respuesta de POST_ACTIVITIES:', response);
  } catch (error) {
    if (error.response) {
   
      console.error('Error en la respuesta del servidor:', error.response.data);
      console.error('Código de estado:', error.response.status);
    } else if (error.request) {
    
      console.error('No se recibió respuesta del servidor:', error.request);
    } else {
    
      console.error('Error durante la configuración de la solicitud:', error.message);
    }
  }
};
