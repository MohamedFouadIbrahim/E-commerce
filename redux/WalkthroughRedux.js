export const types = {
	MARK_WALKTHROUGH_SEEN: 'MARK_WALKTHROUGH_SEEN',
	SELECT_COUNTRY: 'SELECT_COUNTRY',
	SELECT_LANGUAGE: 'SELECT_LANGUAGE',
};

export const actions = {
	markWalkthroughSeen: (dispatch, seen_walkthrough) => {
		dispatch({ type: types.MARK_WALKTHROUGH_SEEN, seen_walkthrough })
	},
	selectCountry: (dispatch, selected_country) => {
		dispatch({ type: types.SELECT_COUNTRY, selected_country })
	},
	selectLanguage: (dispatch, selected_language) => {
		dispatch({ type: types.SELECT_LANGUAGE, selected_language })
	},
};

const initialState = {
	seen_walkthrough: false,
	selected_country: null,
	selected_language: null,
}

export const reducer = (state = initialState, action) => {
	const { seen_walkthrough, selected_country, selected_language } = action;

	switch (action.type) {
		case types.MARK_WALKTHROUGH_SEEN:
			return { ...state, seen_walkthrough };
		case types.SELECT_COUNTRY:
			return { ...state, selected_country };
		case types.SELECT_LANGUAGE:
			return { ...state, selected_language };
		default: 
			return state
	}
}