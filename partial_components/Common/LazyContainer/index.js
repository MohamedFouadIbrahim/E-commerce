import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
	View,
	ActivityIndicator,
} from 'react-native';

class LazyContainer extends Component {
	state = { isMounting: true };

	componentDidMount() {
		requestAnimationFrame(() => this.setState({ isMounting: false }));
	}

	render() {
		const {
			bgColor1,
		} = this.props;

		if (this.state.isMounting) {
			const {
				mainColor,
			} = this.props;

			return (
				<View
					style={{
						flex: 1,
						backgroundColor: bgColor1,
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<ActivityIndicator size="large" color={mainColor} />
				</View>
			);
		}

		const {
			style,
			children,
			backgroundColor = bgColor1,
			...props
		} = this.props;

		return (
			<View
				style={[
					style,
					{
						flex: 1,
						backgroundColor
					}
				]}
				{...props}>
				{children}
			</View>
		);
	}
};

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			colors: {
				mainColor,
				bgColor1,
			},
		},
	},
}) => ({
	mainColor,
	bgColor1,
})


export default connect(mapStateToProps)(LazyContainer)