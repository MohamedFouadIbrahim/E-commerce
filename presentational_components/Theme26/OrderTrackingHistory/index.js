import React, { Component } from 'react'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import Timeline from 'react-native-timeline-feed'
import { View } from 'react-native';
import FontedText from '../../../partial_components/Common/FontedText';

export default class OrderTrackingHistory extends Component {
	renderItem = ({ item }) => {
		const {
			textColor1,
			textColor2,
			translate,
			pagePadding,
		} = this.props

		return (
			<View
				style={{
					marginTop: -10,
				}}>
				<FontedText
					style={{
						fontSize: 18,
						color: textColor1,
					}}>{item.title}</FontedText>

				<FontedText 
					style={{ 
						fontSize: 14,
						marginTop: pagePadding,
						color: textColor2,
					}}>
					{item.description}
				</FontedText>

				{item.Note && item.Note.length ?
					<FontedText
						style={{
							fontSize: 14,
							color: textColor2,
						}}>{translate("Note")}: {item.Note}</FontedText> : null}
			</View>
		)
	}

	render() {
		const {
			bgColor1,
			mainColor,
			largePagePadding,
			timeline_data,
		} = this.props

		return (
			<LazyContainer>
				<CustomHeader
					title={"TrackingHistory"}
					navigation={this.props.navigation}
					leftComponent='back' />

				<Timeline
					innerCircleType='dot'
					showTime={false}
					separator={false}
					circleColor={mainColor}
					lineColor={mainColor}
					flatListProps={{
						contentContainerStyle: {
							padding: largePagePadding,
						}
					}}
					renderDetail={this.renderItem}
					keyExtractor={item => String(item.Id)}
					data={timeline_data} />
			</LazyContainer>
		)
	}
}