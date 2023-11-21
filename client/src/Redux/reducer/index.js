import {
  GET_COUNTRIES,
  GET_BY_NAME,
  GET_BY_DETAIL,
  GET_ACTIVITY,
  FILTER_BY_ACTIVITY,
  FILTER_BY_CONTINENT,
  ORDER_BY,
  POST_ACTIVITIES,
} from '../actions';

const initialState = {
  allCountries: [],
  filteredCountries: [],
  detailedCountry: [],
  activities: [],
  filters: {
    continent: null,
    activity: null,
  },
  order: {
    field: null,
    direction: null,
  },
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        allCountries: action.payload,
      };
    case GET_BY_NAME:
      return {
        ...state,
        allCountries: action.payload,
      };
      case GET_BY_DETAIL:
  return {
    ...state,
    detailedCountry: action.payload, // Cambia allCountriesCopy a detailedCountry o el nombre que prefieras
  };
  case GET_ACTIVITY:
    return {
      ...state,
      activities: action.payload,
    };
      case FILTER_BY_CONTINENT:
        const { continent } = action.payload;
        const filteredByContinent = state.allCountries.filter(country => country.continent === continent);
        return {
          ...state,
          filteredCountries: filteredByContinent,
          filters: {
            ...state.filters,
            continent,
          },
        };

        case FILTER_BY_ACTIVITY:
          const { activity } = action.payload;
          const filteredByActivity = state.allCountries.filter((country) =>
            country.activities.some((a) => a.name === activity)
          );
          return {
            ...state,
            filteredCountries: filteredByActivity,
            filters: {
              ...state.filters,
              activity,
            },
          };

    case ORDER_BY:
      const { field, direction } = action.payload;
      const orderedCountries = state.filteredCountries.length > 0 ?
        [...state.filteredCountries] :
        [...state.allCountries];

      orderedCountries.sort((a, b) => {
        if (direction === 'asc') {
          return a[field].localeCompare(b[field]);
        } else {
          return b[field].localeCompare(a[field]);
        }
      });

      return {
        ...state,
        filteredCountries: orderedCountries,
        order: {
          field,
          direction,
        },
      };

      case POST_ACTIVITIES:
        return {
          ...state,
          // Puedes manejar la respuesta si es necesario aquí.
        };

    default:
      return state;
  }
}


export default rootReducer;
