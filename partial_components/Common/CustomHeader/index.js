import React, { Component } from 'react';
import { View, StatusBar, I18nManager, Platform } from 'react-native'
import { connect } from 'react-redux'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import TranslatedText from '../TranslatedText';
import FontedText from '../FontedText';
import TouchableIcon from '../TouchableIcon';
import { shadowStyle0, shadowStyle1 } from '../../../constants/Style';
import { getInitialRouteName } from '../../../utils/Navigation';
import CustomTouchable from '../CustomTouchable';
import { getStatusBarStyle } from '../../../utils/Misc';
import ProgressBar from '../ProgressBar';
import SearchBar from '../../Theme26/SearchBar';

export const headerIconSize = 20
export const secondHeaderIconSize = 25
export const headerButtonPadding = 5
export const headerFontSize = 16
export const headerLargeFontSize = 34

export const headerHeight = Platform.OS === 'ios' ? 56 : 56 // 46
// export const headerHeight = store.getState().runtime_config.runtime_config.screens.Top_Header_10_2.HeaderStyle == 'classic' ? 56 : 46

class CustomHeader extends Component {
	renderLeftComponent = () => {
		const {
			textColor1,
		} = this.props

		const {
			color = textColor1,
			leftComponent = "back",
			navigation,
			goTo,
			search = false,
			modernHeader,
			HeaderStyle
		} = this.props

		if (leftComponent === "drawer") {
			const { Side_Menu_10_1 } = this.props

			if (Side_Menu_10_1.Enable.Value) {
				return (
					<CustomTouchable
						onPress={() => {
							navigation.toggleDrawer()
						}}
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							width: '100%',
							height: '100%',
						}}>
						<SimpleLineIcons name="menu" color={color} size={headerIconSize} />
					</CustomTouchable>
				)
			}
			else {
				return (
					<View
						style={{
							justifyContent: 'center',
							alignItems: 'center',
						}} />
				)
			}
		}
		else if (leftComponent === "back") {
			const {
				ShowBackButtonTitle,
			} = this.props

			return (
				<CustomTouchable
					onPress={() => {
						if (goTo) {
							navigation.navigate(goTo)
						} else {
							navigation.goBack()
						}
					}}
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						width: '100%',
						height: '100%',
						marginRight: search && modernHeader && HeaderStyle.Value != 'classic' ? 15 : 0
					}}>
					<Ionicons
						name={`ios-arrow-${I18nManager.isRTL ? 'forward' : 'back'}`}
						size={secondHeaderIconSize}
						color={color} />

					{ShowBackButtonTitle.Value && <TranslatedText style={{ color, textAlign: 'left', marginLeft: 5, }} text={"HeaderBackTitle"} />}
				</CustomTouchable>
			)
		}
		else if (leftComponent) {
			return leftComponent
		}
	}

	renderMiddleComponent = () => {
		const {
			middleComponent,
			search = false,
			modernHeader = false,
			HeaderStyle,
			largePagePadding,
			onSearchSubmitEditting
		} = this.props

		if (middleComponent) {
			return middleComponent
		}
		else {
			const {
				textColor1,
			} = this.props

			let {
				title,
				translateTitle = true,

			} = this.props

			const {
				subTitle,
				color = textColor1,
				mainScreen,
			} = this.props

			if (mainScreen && title === getInitialRouteName()) {
				const {
					HomeTitle,
				} = this.props

				if (HomeTitle && HomeTitle.length) {
					title = HomeTitle
					translateTitle = false
				}
			}

			if (search && modernHeader && HeaderStyle.Value != 'classic') {
				return (
					<SearchBar
						style={{
							// marginHorizontal: largePagePadding,
							height: headerHeight - 20,
							fontSize: 12
						}}
						showSearchIcon={false}
						visible={true}
						autoFocus={false}
						onSubmitEditing={onSearchSubmitEditting}
					/>
				)

			} else {
				return (
					<View
						style={{}}>
						{translateTitle ?
							<TranslatedText style={{ color, textAlign: 'center', }} text={title} /> :
							<FontedText style={{ color, textAlign: 'center', }}>{title}</FontedText>}
						{subTitle && <TranslatedText style={{ color, textAlign: 'center', fontSize: 12, }} text={subTitle} />}
					</View>
				)
			}

		}
	}

	rightComponentContainerWidth(headerHeight, rightNumOfItems) {
		// this method for control the width of container rightComponenr header if you want add 3 icons 

		if (rightNumOfItems == 1) {
			return headerHeight
		}
		else if (rightNumOfItems == 2) {
			return headerHeight * 1.5
		}
		else if (rightNumOfItems == 3) {
			return headerHeight * 2
		}
		else {
			headerHeight
		}
	}

	renderRightComponent = () => {
		const {
			mainScreen,
			rightComponent,
		} = this.props

		if (rightComponent) {
			return rightComponent
		}
		else if (mainScreen) {
			const {
				textColor1,
			} = this.props

			const {
				color = textColor1,
			} = this.props

			return (
				<TouchableIcon
					onPress={() => {
						this.props.navigation.navigate('Search')
					}}>
					<Ionicons name="ios-search" color={color} size={secondHeaderIconSize} />
				</TouchableIcon>
			)
		}
	}

	render() {
		const {
			statusBarColor,
			bgColor1,
			mainColor,
			HeaderStyle,
			bgColor2,
			mainScreen,
			pagePadding,
			modernHeader = false
		} = this.props

		const {
			backgroundColor = bgColor1,
			androidStatusBarColor = statusBarColor,
			iosBarStyle = getStatusBarStyle(),
			translucent = false,
			rightNumOfItems = 1,
			is_loading,
			largePagePadding,
			borderRadius,
			stopPress = false,
			search = false,
			showShadow = true
		} = this.props

		if (!modernHeader) {
			return ([
				<StatusBar
					key={0}
					backgroundColor={androidStatusBarColor}
					barStyle={iosBarStyle}
					translucent={translucent} />,
				<View
					key={1}
					style={{
						flexDirection: 'row',
						height: headerHeight,
						width: '100%',
						alignItems: "center",
						justifyContent: 'space-between',
						backgroundColor: backgroundColor,
						marginBottom: 0.5,
						...shadowStyle0,
					}}>
					<View
						style={{
							alignItems: 'center',
							justifyContent: 'center',
							width: headerHeight,
							height: headerHeight,
							zIndex: 2,
						}}>
						{this.renderLeftComponent()}
					</View>

					<View
						style={{
							alignItems: 'center',
							justifyContent: 'center',
							width: this.rightComponentContainerWidth(headerHeight, rightNumOfItems),
							height: headerHeight,
							paddingRight: rightNumOfItems > 1 ? 10 : 0,
							zIndex: 2,
						}}>
						{this.renderRightComponent()}
					</View>

					<View
						pointerEvents="none"
						key={2}
						style={{
							position: 'absolute',
							width: '100%',
							height: headerHeight,
							zIndex: 1,
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						{this.renderMiddleComponent()}
					</View>

					<View
						style={{
							zIndex: 2,
							position: 'absolute',
							bottom: 0,
							width: "100%"
						}}>

						{is_loading &&
							<ProgressBar
								width="100%"
								size={30}
								isContinuous={true}
								height={3}
								borderRadius={0}
								borderWidth={0}
								indeterminateAnimationDuration={900}
								mainColor={mainColor}
							/>}

					</View>

				</View>
			])
		} else if (modernHeader && HeaderStyle.Value != 'classic') { // here new Theme
			return ([
				<StatusBar
					key={0}
					backgroundColor={androidStatusBarColor}
					barStyle={iosBarStyle}
					translucent={translucent} />,

				<View
					key={1}
					style={[{
						flexDirection: 'row',
						height: (headerHeight),
						width: '100%',
						alignItems: "center",
						paddingHorizontal: pagePadding,
						marginBottom: 0.5,
					}, showShadow ? {
						backgroundColor: backgroundColor,
						...shadowStyle0
					} : {}]}>

					<View
						style={{
							alignItems: 'center',
							justifyContent: 'center',
							width: (headerHeight - 20),
							height: (headerHeight),
							zIndex: 2,
							// backgroundColor: bgColor1

						}}>
						{this.renderLeftComponent()}
					</View>

					<CustomTouchable
						onPress={() => {
							if (!stopPress) {
								this.props.navigation.navigate('Search')
							}
						}}
						activeOpacity={1}
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							height: (headerHeight - 20),
							backgroundColor: bgColor2,
							flex: 1,
							marginRight: pagePadding,
							justifyContent: search ? 'flex-start' : 'space-between',
							borderRadius
						}} >

						<View
							// pointerEvents="none"
							pointerEvents={search ? 'auto' : 'none'}
							key={1}
							style={[{
								height: (headerHeight),
								zIndex: 1,
								justifyContent: 'center',
								alignItems: 'center',
								alignSelf: 'center',
								paddingLeft: pagePadding,

							},
								, search ? {
									flex: 1
								} : {}
							]}>
							{this.renderMiddleComponent()}
						</View>

						<View
							style={{
								alignItems: 'center',
								justifyContent: 'center',
								width: this.rightComponentContainerWidth((headerHeight - 20), rightNumOfItems),
								height: (headerHeight),
								paddingRight: rightNumOfItems > 1 ? 10 : 0,
								zIndex: 2,
							}}>
							{this.renderRightComponent()}
						</View>

					</CustomTouchable>

					<View
						style={{
							zIndex: 2,
							position: 'absolute',
							bottom: 0,
							width: "100%"
						}}>

						{is_loading &&
							<ProgressBar
								width="100%"
								size={30}
								isContinuous={true}
								height={3}
								borderRadius={0}
								borderWidth={0}
								indeterminateAnimationDuration={900}
								mainColor={mainColor}
							/>}

					</View>

				</View>

			])

		} else {
			return ([
				<StatusBar
					key={0}
					backgroundColor={androidStatusBarColor}
					barStyle={iosBarStyle}
					translucent={translucent} />,
				<View
					key={1}
					style={{
						flexDirection: 'row',
						height: headerHeight,
						width: '100%',
						alignItems: "center",
						justifyContent: 'space-between',
						backgroundColor: backgroundColor,
						marginBottom: 0.5,
						...shadowStyle0,
					}}>
					<View
						style={{
							alignItems: 'center',
							justifyContent: 'center',
							width: headerHeight,
							height: headerHeight,
							zIndex: 2,
						}}>
						{this.renderLeftComponent()}
					</View>

					<View
						style={{
							alignItems: 'center',
							justifyContent: 'center',
							width: this.rightComponentContainerWidth(headerHeight, rightNumOfItems),
							height: headerHeight,
							paddingRight: rightNumOfItems > 1 ? 10 : 0,
							zIndex: 2,
						}}>
						{this.renderRightComponent()}
					</View>

					<View
						pointerEvents="none"
						key={2}
						style={{
							position: 'absolute',
							width: '100%',
							height: headerHeight,
							zIndex: 1,
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						{this.renderMiddleComponent()}
					</View>

					<View
						style={{
							zIndex: 2,
							position: 'absolute',
							bottom: 0,
							width: "100%"
						}}>

						{is_loading &&
							<ProgressBar
								width="100%"
								size={30}
								isContinuous={true}
								height={3}
								borderRadius={0}
								borderWidth={0}
								indeterminateAnimationDuration={900}
								mainColor={mainColor}
							/>}

					</View>

				</View>
			])
		}
	}
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			screens: {
				Home_12_1: {
					Title: {
						Value: HomeTitle,
					},
				},
				Side_Menu_10_1,
				Top_Header_10_2: {
					ShowBackButtonTitle,
					HeaderStyle
				},
			},
			colors,
			styles
		},
	},
	network: { is_loading },
}) => ({
	...colors,
	...styles,
	HomeTitle,
	HeaderStyle,
	Side_Menu_10_1,
	ShowBackButtonTitle,
	is_loading,
})

export default connect(mapStateToProps)(CustomHeader)