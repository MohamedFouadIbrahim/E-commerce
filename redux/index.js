import { combineReducers } from 'redux';

import { localizeReducer } from 'react-localize-redux';
import { reducer as LoginRedux } from './LoginRedux';
import { reducer as LangRedux } from './LangRedux';
import { reducer as NetworkRedux } from './NetworkRedux';
import { reducer as CacheRedux } from './CacheRedux';
import { reducer as PlacesRedux } from './PlacesRedux';
import { reducer as BadgesRedux } from './BadgesRedux';
import { reducer as TopicsRedux } from './TopicsRedux';
import { reducer as WalkthroughRedux } from './WalkthroughRedux';
import { reducer as RuntimeConfigRedux } from './RuntimeConfigRedux';
import { reducer as InspectorRedux } from './InspectorRedux';
import { reducer as NavigationRedux } from './NavigationRedux';
import { reducer as ThemeRedux } from './ThemeRedux';
import { reducer as SecondarySplashRedux } from './SecondarySplash';

const AppReducers = combineReducers({
	login: LoginRedux, 
	language: LangRedux,
	localize: localizeReducer,
	network: NetworkRedux,
	cache: CacheRedux,
	badges: BadgesRedux,
	topics: TopicsRedux,
	walkthrough: WalkthroughRedux,
	places: PlacesRedux,
	runtime_config: RuntimeConfigRedux,
	inspector: InspectorRedux,
	navigation: NavigationRedux,
	theme: ThemeRedux,
	secondarysplash: SecondarySplashRedux
});

export default AppReducers;