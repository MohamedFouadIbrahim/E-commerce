import { Component } from 'react'
import { StatusBar, Platform } from 'react-native'
import { getStatusBarStyle } from '../../../utils/Misc';

class TranslucentStatusBar extends Component {
	componentDidMount() {
		setTimeout(() => {
			this.setStatusBarStyle()
		}, 5);
	}

	componentWillUnmount() {
		this.resetStatusBarStyle()
	}

	setStatusBarStyle = () => {
		StatusBar.setBarStyle(this.props.barStyle || getStatusBarStyle(), true);

		if (Platform.OS === 'android') {
			StatusBar.setBackgroundColor('transparent', true);
			StatusBar.setTranslucent(true);
		}
	}

	resetStatusBarStyle = () => {
		if (Platform.OS === 'android') {
			StatusBar.setTranslucent(false);
		}
	}

	render() {
		return (
			null
		)
	}
}

export default TranslucentStatusBar