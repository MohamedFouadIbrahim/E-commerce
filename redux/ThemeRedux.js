export const types = {
	SET_CATEGORIES_LIST_STYLE: 'SET_CATEGORIES_LIST_STYLE',
};

export const actions = {
	setCategoriesListStyle: (dispatch, categories_list_style) => {
		dispatch({ type: types.SET_CATEGORIES_LIST_STYLE, categories_list_style })
	},
};

const initialState = {
	categories_list_style: null,
}

export const reducer = (state = initialState, action) => {
	const { 
		categories_list_style,
	} = action;

	switch (action.type) {
		case types.SET_CATEGORIES_LIST_STYLE:
			return { ...state, categories_list_style };
		default: 
			return state
	}
}