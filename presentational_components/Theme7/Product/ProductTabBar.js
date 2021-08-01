import React, { PureComponent } from 'react';
import { View, StyleSheet, Platform, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux'
import TranslatedText from '../../../partial_components/Common/TranslatedText';

const styles = StyleSheet.create({
	tabbar: {
		height: 50,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	tab: {
		alignSelf: 'stretch',
		flex: 1,
		alignItems: 'center',
		...Platform.select({
			ios: {
				justifyContent:'center',
				paddingTop: 0
			},
			android: {
				justifyContent: 'center',
			},
		}),
	}
});

class ProductTabBar extends PureComponent {
	onPress = (key) => {
		this.props.jumpTo(key);
	}

	render() {
		const {
			navigation,
			textColor1,
			textColor2,
			bgColor1,
		} = this.props;

		const activeTintColor = textColor1
		const inactiveTintColor = textColor2

		const { routes } = navigation.state

		return (
			<View style={[styles.tabbar, { backgroundColor: bgColor1 }]}>
				{routes && routes.map((route, index) => {
					const focused = index === navigation.state.index;
					const tintColor = focused ? activeTintColor : inactiveTintColor;

					return (
						<TouchableWithoutFeedback
							key={route.key}
							style={styles.tab}
							onPress={this.onPress.bind(this, route.key)}>
							<View
								style={styles.tab}>
								<TranslatedText
									style={{
										color: tintColor,
										textAlign: 'center',
										fontSize: 14,
										marginTop: 1,
										fontWeight: 'normal',
									}}
									text={route.key} />
							</View>
						</TouchableWithoutFeedback>
					);
				})}
			</View>
		)
	}
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			colors,
			styles,
		},
	},
}) => ({
	...colors,
	...styles,
})

export default connect(mapStateToProps)(ProductTabBar)