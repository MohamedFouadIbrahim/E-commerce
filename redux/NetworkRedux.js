export const types = {
	SET_IS_CONNECTED: 'SET_IS_CONNECTED',
	SET_IS_INTERNAL_ERROR: 'SET_IS_INTERNAL_ERROR',
	SET_IS_NOT_FOUND_ERROR: 'SET_IS_NOT_FOUND_ERROR',
	SET_IS_FLOOD_ERROR: 'SET_IS_FLOOD_ERROR',
	SET_IS_LOADING: 'SET_IS_LOADING',
};

export const actions = {
	setIsConnected: (dispatch, is_connected) => {
		dispatch({ type: types.SET_IS_CONNECTED, is_connected })
	},
	setIsInternalError: (dispatch, is_internal_error) => {
		dispatch({ type: types.SET_IS_INTERNAL_ERROR, is_internal_error })
	},
	setIsNotFoundError: (dispatch, is_not_found_error) => {
		dispatch({ type: types.SET_IS_NOT_FOUND_ERROR, is_not_found_error })
	},
	setIsFloodError: (dispatch, is_flood_error) => {
		dispatch({ type: types.SET_IS_FLOOD_ERROR, is_flood_error })
	},
	setIsLoading: (dispatch, is_loading) => {
		dispatch({
			type: types.SET_IS_LOADING, is_loading
		})
	},
};

const initialState = {
	is_connected: true,
	is_internal_error: false,
	is_not_found_error: false,
	is_flood_error: false,
	is_loading: false,
}

export const reducer = (state = initialState, action) => {
	const {
		is_connected,
		is_internal_error,
		is_not_found_error,
		is_flood_error,
		is_loading,
	} = action;

	switch (action.type) {
		case types.SET_IS_CONNECTED:
			return { ...state, is_connected };
		case types.SET_IS_INTERNAL_ERROR:
			return { ...state, is_internal_error };
		case types.SET_IS_NOT_FOUND_ERROR:
			return { ...state, is_not_found_error };
		case types.SET_IS_FLOOD_ERROR:
			return { ...state, is_flood_error };
		case types.SET_IS_LOADING:
			return { ...state, is_loading };
		default:
			return state
	}
}