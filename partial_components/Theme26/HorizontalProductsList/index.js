import React, { PureComponent } from 'react'
import { View, I18nManager, FlatList } from 'react-native'
import { connect } from 'react-redux'
import HorizontalProduct, { imageHeight } from '../HorizontalProduct';
import RemoteDataContainer from '../../Common/RemoteDataContainer';
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomTouchable from '../../Common/CustomTouchable';
import LinearGradient from 'react-native-linear-gradient';

class HorizontalProductsList extends PureComponent {
	constructor(props) {
		super(props)

		const {
			HomeProductOffersSize,
			ProductRelatedSize,
			YouMayLikeProductsStyle,
			DefaultProductSize,
			specificProductSize = null
		} = this.props

		switch (DefaultProductSize.Value) {
			case 1:
				this.imageHeight = 90
				break
			case 2:
				this.imageHeight = 120
				break
			case 3:
				this.imageHeight = 150
				break
			case 4:
				this.imageHeight = 380
				break
			default:
				this.imageHeight = 150
		}

		if (specificProductSize) {

			switch (specificProductSize.Value) {
				case 1:
					this.imageHeight = 90
					break
				case 2:
					this.imageHeight = 120
					break
				case 3:
					this.imageHeight = 150
					break
				case 4:
					this.imageHeight = 380
					break
				default:
					this.imageHeight = 150
			}

		}

		this.state = {
			isScrollButtonShown: true,
		}

		this.currentScroll = 0
	}

	incrementScroll = (increment_by_value) => {
		this.currentScroll = this.currentScroll + increment_by_value
		this.listRef.scrollToOffset({ offset: this.currentScroll })
	}

	onPressScroll = () => {
		this.setState({
			isScrollButtonShown: false,
		})

		this.incrementScroll(150)
	}

	renderProduct = ({ item, index }) => {
		return (
			<HorizontalProduct
				specificProductSize={this.props.specificProductSize}
				navigation={this.props.navigation}
				pushNavigation={true}
				item={item}
				index={index} />
		)
	}

	renderScrollButton = () => {

		const { fixScrollButton } = this.props

		if (this.state.isScrollButtonShown) {
			const width = 30

			return (
				<CustomTouchable
					onPress={this.onPressScroll}
					style={{
						position: 'absolute',
						right: 0,
						backgroundColor: "transparent",
						top: fixScrollButton ? 10 : 0,
						width,
						height: this.imageHeight,
					}}>
					<LinearGradient
						start={{ x: 0.0, y: 0.0 }}
						end={{ x: 1.0, y: 0.0 }}
						colors={[
							`rgba(0, 0, 0, 0.02)`,
							`rgba(0, 0, 0, 0.2)`,
							`rgba(0, 0, 0, 0.5)`
						]}
						style={{
							width,
							height: this.imageHeight,
							justifyContent: 'center',
							alignItems: 'center',
							borderTopLeftRadius: 20,
							borderBottomLeftRadius: 20,
						}}>
						<Ionicons
							name={`ios-arrow-${I18nManager.isRTL ? 'back' : 'forward'}`}
							size={22}
							color={"white"} />
					</LinearGradient>
				</CustomTouchable>
			)
		}
	}

	hideScrollButton = () => {
		if (this.state.isScrollButtonShown) {
			this.setState({
				isScrollButtonShown: false,
			})
		}
	}

	renderListComponent = () => {
		const {
			pagePadding,
			url,
			...restProps
		} = this.props

		const commonProps = {
			contentContainerStyle: {
				padding: pagePadding,
			},
			ItemSeparatorComponent: () => <View style={{ width: pagePadding, backgroundColor: 'transparent' }} />,
			onScrollBeginDrag: this.hideScrollButton,
			keyExtractor: ({ Id }) => `${Id}`,
			horizontal: true,
			showsHorizontalScrollIndicator: false,
			renderItem: this.renderProduct
		}

		if (url) {
			return (
				<RemoteDataContainer
					ref={ref => this.listRef = ref}
					url={url}
					onDataFetched={(data) => {
						if (data.length <= 2) {
							this.setState({ isScrollButtonShown: false })
						}
					}}
					{...commonProps}
					{...restProps} />
			)
		}
		else {
			const { data } = this.props

			if (data.length <= 2) {
				this.setState({ isScrollButtonShown: false })
			}

			return (
				<FlatList
					ref={ref => this.listRef = ref}
					{...commonProps}
					{...restProps} />
			)
		}
	}

	render() {
		return (
			<View
				style={{
					flex: 1,
				}}>
				{this.renderListComponent()}
				{this.renderScrollButton()}
			</View>
		)
	}
}



const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			styles,
			screens: {
				Product_Details_09_5: {
					HomeProductOffersSize,
					ProductRelatedSize,
					YouMayLikeProductsStyle,
					DefaultProductSize
				}
			},
		},
	},
}) => ({
	HomeProductOffersSize,
	ProductRelatedSize,
	YouMayLikeProductsStyle,
	DefaultProductSize,
	...styles,
})

export default connect(mapStateToProps)(HorizontalProductsList)