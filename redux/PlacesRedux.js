export const types = {
	SET_COUNTRIES: 'SET_COUNTRIES',
	SET_COUNTRIES_VERSION: 'SET_COUNTRIES_VERSION',
};

export const actions = {
	setCountries: (dispatch, countries) => {
		dispatch({ type: types.SET_COUNTRIES, countries })
	},
	setCountriesVersion: (dispatch, countries_version) => {
		dispatch({ type: types.SET_COUNTRIES_VERSION, countries_version })
	},
};

const initialState = {
	countries: [],
	cities: [],
	countries_version: null,
}

export const reducer = (state = initialState, action) => {
	const { countries, countries_version } = action;

	switch (action.type) {
		case types.SET_COUNTRIES:
			return { ...state, countries };
		case types.SET_COUNTRIES_VERSION:
			return { ...state, countries_version };
		default:
			return state
	}
}