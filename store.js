// creating a reducer and a store

// Store
function createStore(reducer) {
	let currentState = reducer(undefined, {});
	return {
		getState: () => currentState,
		dispatch: (action) => {
			currentState = reducer(currentState, action);
		}
	};
}

// initial state

const initialState = {
	favorites: []
};

// reducer
function favoritesReducers(state = initialState, action) {
	switch (action.type) {
		case 'ADD_FAVORITE': {
			const addedFavorite = action.payload.favorite;
			const favorites = [ ...state.favorites, addedFavorite ];
			return { favorites };
		}
		case 'REMOVE_FAVORITE': {
			const removedFavorite = action.payload.favorite;
			const favorites = state.favorites.filter((favorite) => favorite.id !== removedFavorite.id);
			return { favorites };
		}
		default:
			return state;
	}
}

const store = createStore(favoritesReducers);
export default store;
