import React, { Component } from 'react'
import { ScrollView, FlatList, View } from 'react-native'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import CountryItem from './CountryItem';
import LanguageItem from './LanguageItem';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import TranslucentStatusBar from '../../../partial_components/Common/TranslucentStatusBar';
import ItemSeparator from '../../../partial_components/Common/ItemSeparator';
import { hideVirtualizedListWarning } from '../../../utils/Misc';

hideVirtualizedListWarning()

class SelectBasics extends Component {
	renderLanguage = ({ item, index }) => {
		const { onPressLanguage } = this.props

		return (
			<LanguageItem
				item={item}
				index={index}
				onPress={onPressLanguage}
			/>
		)
	}

	renderCountry = ({ item, index }) => {
		const { onPressCountry } = this.props

		return (
			<CountryItem
				item={item}
				index={index}
				onPress={onPressCountry}
			/>
		)
	}

	renderListHeader = (PickUp, title) => {
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
						color: this.props.mainColor,
						fontSize: 22,
						fontWeight: 'bold',
						marginLeft: 12
					}} text={title} />
			</View>
		)
	}

	render() {
		const {
			Languages,
			Countries,
			bgColor2,
		} = this.props

		return (
			<LazyContainer>
				<TranslucentStatusBar />

				<ScrollView
					contentContainerStyle={{
						paddingVertical: 40,
					}}>
					<FlatList
						numColumns={3}
						ListHeaderComponent={this.renderListHeader("PickUpYour", 'Language')}
						keyExtractor={(item) => String(item.Id)}
						data={Languages}
						columnWrapperStyle={{
							marginHorizontal: 5
						}}
						renderItem={this.renderLanguage} />

					<FlatList
						contentContainerStyle={{
							borderColor: bgColor2,
							paddingVertical: 18,
						}}
						ListHeaderComponentStyle={{
							marginVertical: 15
						}}
						ItemSeparatorComponent={() => <ItemSeparator />}
						ListHeaderComponent={this.renderListHeader("PickUpYour", 'Country')}
						keyExtractor={(item) => String(item.Id)}
						data={Countries}
						renderItem={this.renderCountry} />
				</ScrollView>
			</LazyContainer>
		)
	}
}

export default SelectBasics