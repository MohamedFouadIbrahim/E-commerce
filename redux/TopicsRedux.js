export const types = {
	SET_SUBSCRIBED_TOPICS: 'SET_SUBSCRIBED_TOPICS',
};

export const actions = {
	setSubscribedTopics: (dispatch, subscribed_topics) => {
		dispatch({ type: types.SET_SUBSCRIBED_TOPICS, subscribed_topics })
	},
};

const initialState = {
	subscribed_topics: null,
}

export const reducer = (state = initialState, action) => {
	const { 
		subscribed_topics,
	} = action;

	switch (action.type) {
		case types.SET_SUBSCRIBED_TOPICS:
			return { ...state, subscribed_topics };
		default: 
			return state
	}
}