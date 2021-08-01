import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { shadowStyle0 } from '../../../constants/Style';
import CustomTouchable from '../../Common/CustomTouchable';
import FontedText from '../../Common/FontedText';
import RemoteDataContainer from '../../Common/RemoteDataContainer';
import { onPressCategory } from '../../../utils/Categories';

class HorizontalCategoriesList extends React.Component {
	renderCategory = ({ item }) => {
		const { Name } = item

		const { 
			pagePadding, 
			borderRadius, 
			bgColor2,
		} = this.props

		return (
			<CustomTouchable
				onPress={() => {
					onPressCategory(this.props.navigation, item, null, true)
				}}
				style={{
					borderRadius: borderRadius,
					padding: pagePadding,
					backgroundColor: bgColor2,
					justifyContent: 'center',
					alignItems: 'center',
					margin: 1,
					...shadowStyle0
				}}>
				<FontedText>
					{Name}
				</FontedText>
			</CustomTouchable>
		)
	}

	render() {
		const { 
			pagePadding, 
			...restProps 
		} = this.props

		return (
			<RemoteDataContainer
				hideWhenEmpty={true}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				keyExtractor={({ Id }) => `${Id}`}
				ItemSeparatorComponent={
					() => <View style={{ width: pagePadding, backgroundColor: 'transparent' }} />
				}
				renderItem={this.renderCategory}
				{...restProps}
			/>
		)
	}
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			styles,
			colors
		},
	},
}) => ({
	...colors,
	...styles,
})

export default connect(mapStateToProps)(HorizontalCategoriesList)