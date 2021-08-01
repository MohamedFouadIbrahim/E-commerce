import React from 'react';
import { View } from 'react-native';
import RemoteDataContainer from '../../../partial_components/Common/RemoteDataContainer'
import PaddingCalculator from '../../../partial_components/Common/RemoteDataContainer/Helper'
import LazyContainer from '../../../partial_components/Common/LazyContainer'
import FontedText from '../../../partial_components/Common/FontedText'
import RemoteImage from '../../../partial_components/Common/RemoteImage'
import ItemSeparator from '../../../partial_components/Common/ItemSeparator'
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import { screenWidth } from '../../../constants/Metrics';
import { shadowStyle1, shadowStyle2, shadowStyle3, shadowStyle4 } from '../../../constants/Style';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { redColor } from '../../../constants/Theme26/Colors';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import PopupsSlider from '../../../partial_components/Theme26/PopupsSlider';
import { PopupsListProps } from '../../../utils/PopupsSliderList';

class SubStores extends React.Component {
	constructor(props) {
		super(props)

		const { largePagePadding, pagePadding } = this.props
		this.imageDim = (screenWidth - ((largePagePadding * 2) + pagePadding)) / 2
		this.halfPagePadding = pagePadding / 2
	}

	state = {
		showFooter: false
	}

	renderSubStore = ({ item, index, ItemMarginHorizontal }) => {
		const { Id, Name, Image: { ImageUrl, TextColor }, IsLike, ProductsCount, Likes, Create } = item

		const {
			bgColor1,
			pagePadding,
			smallBorderRadius,
			ShowTextOnImage,
			largePagePadding,
			mainColor,
			onLikePress,
			onChildChange
		} = this.props
		const { imageDim } = this

		return (
			<CustomTouchable
				onPress={() => { this.props.navigation.navigate('SubStore', { Id, onChildChange }) }}
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					paddingHorizontal: this.PaddingObj.ItemMarginHorizontal,
				}}>
				<View
					style={{
						width: 100,
						height: 100,
						backgroundColor: bgColor1,
						borderRadius: smallBorderRadius,
						...shadowStyle2
					}}>
					<RemoteImage
						dimension={250}
						style={{
							width: 100,
							height: 100,
							borderRadius: smallBorderRadius
						}}
						uri={ImageUrl}
					/>
				</View>

				<View
					style={{
						flex: 1,
						paddingLeft: largePagePadding,
						justifyContent: 'center',
					}}>
					<View>
						<FontedText style={{ fontSize: 15, textAlign: 'left' }}>{Name}</FontedText>
						<View style={{ flexDirection: 'row', marginTop: 7 }} >
							<View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 5 }} >
								<FontedText>
									{Likes}
								</FontedText>

								<Entypo
									name='heart'
									color={redColor}
									size={18}
									style={{ marginHorizontal: 5 }}
								/>
							</View>

							<View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 5 }} >
								<FontedText>
									{ProductsCount}
								</FontedText>

								<SimpleLineIcons
									name='bag'
									color={mainColor}
									size={18}
									style={{ marginHorizontal: 5 }}
								/>
							</View>
							<View style={{ flexDirection: 'row', alignItems: 'center' }} >
								<TranslatedText text={'Since'} style={{ marginHorizontal: 5, }} />
								<FontedText>
									{new Date(Create).getFullYear()}
								</FontedText>
							</View>
						</View>
					</View>
				</View>

				<CustomTouchable
					onPress={() => {
						onLikePress(Id, IsLike)
					}}
				>
					<AntDesign
						name={IsLike ? 'heart' : 'hearto'}
						color={redColor}
						size={20}
					/>
				</CustomTouchable>
			</CustomTouchable>
		)
	}

	render() {
		const {
			largePagePadding,
			mainScreen,
			pagePadding,
			triggerRefresh,
			url,
			onDataFetch,
			data: {
				TopPopups,
				BottomPopups
			}
		} = this.props

		this.PaddingObj = PaddingCalculator(1);

		return (
			<LazyContainer>
				<CustomHeader
					navigation={this.props.navigation}
					mainScreen={mainScreen}
					title='SubStores'
					leftComponent='drawer'
				/>

				<RemoteDataContainer
					triggerRefresh={triggerRefresh}
					pagination={true}
					url={url}
					keyExtractor={({ Id }) => `${Id}`}

					renderItem={this.renderSubStore}

					ItemSeparatorComponent={
						() => <View style={{ height: pagePadding, backgroundColor: 'transparent' }} />
					}

					onDataFetched={(data, fulldata) => {
						if (fulldata.TotalItemLength == data.length) {
							this.setState({ showFooter: true })
						}
						onDataFetch && onDataFetch(fulldata)
					}}
					{...PopupsListProps(TopPopups, BottomPopups, mainScreen, this.state.showFooter && mainScreen, 'SubStoresTopPopups', 'SubStoresBottomPopups', {
						navigation: this.props.navigation,

					}, {
						navigation: this.props.navigation,
					})}

				/>

			</LazyContainer>
		)
	}
}

export default SubStores