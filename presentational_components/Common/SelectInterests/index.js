import React, { Component } from 'react'
import { ScrollView, FlatList, View, ActivityIndicator } from 'react-native'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import ListItem from './ListItem';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import TranslucentStatusBar from '../../../partial_components/Common/TranslucentStatusBar';
import RemoteDataContainer from '../../../partial_components/Common/RemoteDataContainer';
import CustomButton from '../../../partial_components/Common/CustomButton';
import { screenWidth, screenHeight } from '../../../constants/Metrics';
import GenderItem from './GenderItem';
import { hideVirtualizedListWarning } from '../../../utils/Misc';

hideVirtualizedListWarning()

class SelectInterests extends Component {
	constructor() {
		super()

		this.state = {
			genders: [],
			interests: [],
			didFetchData: false,
		}

		this.numColumns_Interest = 3
		this.itemDim_Interest = screenWidth / this.numColumns_Interest
		this.touchableDim_Interest = this.itemDim_Interest * 0.9

		this.numColumns_Gender = 2
		this.itemDim_Gender = screenWidth / this.numColumns_Gender
		this.touchableDim_Gender = this.itemDim_Gender * 0.9
	}

	submit = () => {
		const { genders, interests } = this.state
		const selectedInterests = interests.filter(item => item.isSelected).map(item => item.Id)
		const selectedGender = genders.find(item => item.isSelected)

		this.props.submit({ selectedInterests, selectedGender })
	}

	onPressGender = (item, index) => {
		this.setState({
			genders: this.state.genders.map(gender => ({
				...gender,
				isSelected: gender.Id === item.Id ? (item.isSelected ? false : true) : false
			}))
		})
	}

	renderGender = ({ item, index }) => {
		return (
			<GenderItem
				item={item}
				index={index}
				itemDim={this.itemDim_Gender}
				touchableDim={this.touchableDim_Gender}
				onPress={this.onPressGender}
			/>
		)
	}

	onPressInterest = (item, index) => {
		this.setState({
			interests: this.state.interests.map(interest => ({
				...interest,
				isSelected: interest.Id === item.Id ? true : interest.isSelected
			}))
		})
	}

	renderInterest = ({ item, index }) => {
		return (
			<ListItem
				item={item}
				index={index}
				itemDim={this.itemDim_Interest}
				touchableDim={this.touchableDim_Interest}
				onPress={this.onPressInterest}
			/>
		)
	}

	renderListHeader = (PickUp, title) => {
		if (this.state.didFetchData) {
			const { mainColor } = this.props

			return (
				<View>
					<TranslatedText
						style={{
							fontSize: 16,
							fontWeight: 'bold',
							marginLeft: 10
						}} text={PickUp} />
					<TranslatedText
						style={{
							color: mainColor,
							fontSize: 22,
							fontWeight: 'bold',
							marginLeft: 12
						}} text={title} />
				</View>
			)
		}
		else {
			return null
		}
	}

	render() {
		const {
			mainColor,
			largePagePadding,
			bgColor2,
		} = this.props

		const {
			didFetchData,
		} = this.state

		return (
			<LazyContainer>
				<TranslucentStatusBar />

				<ScrollView
					contentContainerStyle={{
						paddingVertical: 40,
					}}>
					{this.props.AskForGender.Value ?
						<FlatList
							numColumns={this.numColumns_Gender}
							ListHeaderComponent={this.renderListHeader("PickUpYour", 'Gender')}
							keyExtractor={({ Id }) => `${Id}`}
							data={this.state.genders}
							contentContainerStyle={{
								paddingHorizontal: 5
							}}
							renderItem={this.renderGender} /> : null}

					<RemoteDataContainer
						url={"Customer/Interest"}
						onDataFetched={(data, { AvailableGenders }) => {
							this.setState({
								interests: data,
								genders: AvailableGenders,
								didFetchData: true,
							})
						}}
						numColumns={this.numColumns_Interest}
						pagination={false}
						updatedData={this.state.interests}
						keyExtractor={({ Id }) => `${Id}`}
						contentContainerStyle={{
							borderColor: bgColor2,
							paddingHorizontal: 5,
							paddingBottom: largePagePadding,
						}}
						columnWrapperStyle={{
							marginTop: -5
						}}
						ListHeaderComponentStyle={{
							marginVertical: 15
						}}
						ListHeaderComponent={this.renderListHeader("PickUpYour", 'Interests')}
						renderItem={this.renderInterest} />
				</ScrollView>

				{didFetchData ? <CustomButton
					onPress={this.submit}
					style={{
						position: 'absolute',
						bottom: largePagePadding,
						alignSelf: 'center',
						width: screenWidth - (largePagePadding * 2)
					}}
					loading={this.props.lockSubmit}
					title="Done" /> : null}
			</LazyContainer>
		)
	}
}

export default SelectInterests