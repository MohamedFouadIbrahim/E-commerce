/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider } from 'react-redux';
import { Alert, BackHandler, Platform } from 'react-native';
import AppContainer from './AppContainer';
import { PersistGate } from 'redux-persist/es/integration/react'
import configureStore from './redux/configureStore'
const { persistor, store } = configureStore();
import { LocalizeProvider } from 'react-localize-redux';
import { ExternalTranslate } from './utils/Translate';
import { requestNotifications } from 'react-native-permissions';
import { setJSExceptionHandler, setNativeExceptionHandler } from "react-native-exception-handler";
import { ReportJSException, ReportNativeException } from './services/ExceptionService';

// Export the store, so we can use it outside React components (where we can't connect)
// I don't know if there's a better way to achieve that..
// April 10, 2019: I think there's now with React hooks, have to check that out...
export { store };

setJSExceptionHandler((e, isFatal) => {
	ReportJSException(e.name, e.message, isFatal)
});

setNativeExceptionHandler(errorString => {
	ReportNativeException(errorString)
});

class App extends React.Component {
	constructor() {
		super()

		if (Platform.OS === 'ios') {
			requestNotifications(['alert', 'badge', 'sound']).then((res) => { })
		}
	}

	onBeforeLift = () => {
		const getStore = store.getState()

		if (getStore.runtime_config && getStore.runtime_config.runtime_config) {
			const { AppExitConfirmation } = getStore.runtime_config.runtime_config.screens.Home_12_1

			if (AppExitConfirmation && AppExitConfirmation.Value) {
				this.addBackHandlerListener()
			}
		}
	}

	addBackHandlerListener = () => {
		BackHandler.addEventListener('hardwareBackPress', () => {
			const getStore = store.getState()
			if (getStore.navigation.isHelloLoaded) {
				Alert.alert(
					ExternalTranslate('ExitConfirmTitle')
					,
					ExternalTranslate('ExitConfirmBody')
					,
					[
						{ text: ExternalTranslate('Yes'), onPress: () => { BackHandler.exitApp() } },
						{ text: ExternalTranslate('No'), onPress: () => { } },
					],
				);
				/* will ask before exist */
				return true;
			}
			else {
				/* will go back without confirmation */
				return false;
			}
		});
	}

	render() {
		return (
			<Provider store={store}>
				<PersistGate
					loading={null}
					onBeforeLift={this.onBeforeLift}
					persistor={persistor}>
					<LocalizeProvider store={store}>
						<AppContainer store={store} />
					</LocalizeProvider>
				</PersistGate>
			</Provider>
		);
	}
}

export default App