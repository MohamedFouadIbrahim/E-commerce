export const types = {
	CACHE_DATA: 'CACHE_DATA',
	CLEAR_CACHED_DATA: 'CLEAR_CACHED_DATA',
	CLEAR_ALL_CACHED_DATA: 'CLEAR_ALL_CACHED_DATA',
};

export const actions = {
	cacheData: (dispatch, name, data) => {
		dispatch({ type: types.CACHE_DATA, name, data })
	},
	clearCachedData: (dispatch, name) => {
		dispatch({ type: types.CLEAR_CACHED_DATA, name })
	},
	clearAllCachedData: (dispatch) => {
		dispatch({ type: types.CLEAR_ALL_CACHED_DATA })
	},
};

const initialState = {
	cached_data: {},
}

export const reducer = (state = initialState, action) => {
	const { name, data } = action;

	switch (action.type) {
		case types.CACHE_DATA:
			let cacheAfterAddition = state.cached_data
			cacheAfterAddition[name] = data

			return { ...state, cached_data: cacheAfterAddition };
		case types.CLEAR_CACHED_DATA:
			let cacheAfterDeletion = state.cached_data
			cacheAfterDeletion[name] = undefined

			return { ...state, cached_data: cacheAfterDeletion };
		case types.CLEAR_ALL_CACHED_DATA:
			return { ...state, ...initialState };
		default: 
			return state
	}
}