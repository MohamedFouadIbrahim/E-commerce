import React, { Component } from 'react'
import {
	View,
	ScrollView,
} from 'react-native'
import FontedText from '../../../partial_components/Common/FontedText';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import ProductOptionsList from '../../../partial_components/Common/ProductOptionsList';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import CustomButton from '../../../partial_components/Common/CustomButton';
import { redColor } from '../../../constants/Theme26/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class ProductOptions extends Component {
	renderOption = (item, index) => {
		const {
			Members,
			Name,
			Type,
			ShowInProducts,
		} = item

		const {
			pagePadding,
			onOptionChange,
			textColor1,
			required,
			largePagePadding
		} = this.props

		if (!ShowInProducts) {
			return null
		}

		if (Members.length == 0) {
			return null
		}

		//hide it of all members are hidden
		if (Members.filter(a => !a.IsHidden).length == 0) {
			return null
		}

		return (
			<View
				key={index}
				style={{
					marginBottom: pagePadding,
				}}>

				{Type.Id == 9 || Type.Id == 8 ?
					null :


					<View style={{ flexDirection: 'row', alignItems: 'center' }}>

						{required && required.length > 0 && required.includes(Name) && <AntDesign name='exclamationcircleo' color={redColor} style={{  bottom: -1 }} size={15} />}

						<FontedText
							style={{
								color: required && required.length > 0 && required.includes(Name) ? redColor : textColor1,
								fontSize: 16,
								fontWeight: 'bold',
								marginHorizontal: required && required.length > 0 && required.includes(Name) ? pagePadding / 2 : 0,
							}}>{Name}</FontedText>

					</View>

				}

				{/* <FontedText
					style={{
						color: textColor1,
						fontSize: 16,
						fontWeight: 'bold',
					}}>{Name}</FontedText> */}

				<ProductOptionsList
					style={{
						marginTop: 5,
					}}
					type={Type.Id}
					selection={1}
					onSelect={(items) => {
						onOptionChange(item, items)
					}}
					data={Members} />
			</View>
		)
	}

	renderOptions = () => {
		const { Options } = this.props

		if (Options) {
			return (
				<View>
					{Options.map(this.renderOption)}
				</View>
			)
		}
	}

	render() {
		const {
			largePagePadding,
			submitLocked,
			borderRadius,
			addToCart,
		} = this.props

		return (
			<LazyContainer>
				<CustomHeader
					navigation={this.props.navigation}
					leftComponent="back"
					title="Options"
				/>

				<ScrollView
					contentContainerStyle={{
						padding: largePagePadding,
					}}>
					{this.renderOptions()}

					<CustomButton
						onPress={addToCart}
						style={{
							height: 45,
							borderRadius,
						}}
						loading={submitLocked}
						title="AddToCart" />
				</ScrollView>
			</LazyContainer>
		)
	}
}