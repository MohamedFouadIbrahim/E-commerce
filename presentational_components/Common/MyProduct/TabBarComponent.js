import React, { Component } from 'react';
import { View, StyleSheet, Platform, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import FontedText from '../../components/FontedText';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
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

class TabBarComponent extends Component {
	onPress = (key) => {
		this.props.jumpTo(key);
	}

	render() {
		const {
			navigation,
			renderIcon,
			activeTintColor,
			inactiveTintColor,
			bgColor1,
			mainColorText,
			mainColor,
		} = this.props;

		const { routes } = navigation.state;

		return (
			<View 
				style={[
					styles.tabbar, {
						backgroundColor: bgColor1,
					}
				]}>
				<View 
					style={{
						backgroundColor: bgColor1,
						width: 100,
						height: 130,
						borderRadius: 65,
						position: 'absolute',
						top: -45,
						transform: [
							{ scaleX: 1.3 }
						]
					}} />

				{routes && routes.map((route, index) => {
					const focused = index === navigation.state.index;
					const tintColor = focused ? activeTintColor : inactiveTintColor;

					if (route.key === "CAMERA") {
						return (
							<CustomTouchable
								key={route.key}
								style={{
									marginTop: -45,
									width: 80,
									height: 80,
									borderRadius: 40,
									backgroundColor: mainColor,
									justifyContent: 'center',
									alignItems: 'center',
								}}
								onPress={this.onPress.bind(this, route.key)}>
								<View
									style={{
										borderRadius: 40,
										justifyContent: 'center',
										alignItems: 'center',
										backgroundColor: mainColor,
									}}>
									<SimpleLineIcons color={mainColorText} name='camera' size={25} />
								</View>
							</CustomTouchable>
						)
					}
					else {
						return (
							<TouchableWithoutFeedback
								key={route.key}
								style={styles.tab}
								onPress={this.onPress.bind(this, route.key)}>
								<View
									style={styles.tab}>
									{renderIcon({
										route,
										index,
										focused,
										tintColor
									})}

									<FontedText 
										style={{ 
											color: tintColor, 
											textAlign: 'center', 
											fontSize: 10, 
											marginTop: 1 
										}}>{route.key}</FontedText>
								</View>
							</TouchableWithoutFeedback>
						);
					}
				})}

			</View>
		);
	}
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			colors,
		},
	},
}) => ({
	...colors,
})

export default connect(mapStateToProps)(withLocalize(TabBarComponent))