import React, { Component } from 'react'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import Timeline from 'react-native-timeline-feed'
import { View } from 'react-native';
import FontedText from '../../../partial_components/Common/FontedText';

export default class OrderTrackingHistory extends Component {
	constructor(props) {
		super(props)
		
		this.orderId = this.props.route.params?.Id

		this.state = {
			dataFitched: false
		}
	}

	componentDidMount() {
		this.setState({
			...this.props,
			dataFitched: true
		})
	}

	renderItem = ({ item, index }) => {

		return (

			<View>
				<FontedText style={{
					fontSize: 18,
					fontWeight: 'bold',
					// marginTop: -15
				}} > {item.title} </FontedText>

				<FontedText style={{ marginVertical: 5, marginLeft: 5 }} >
					{item.description}
				</FontedText>

				{item.Note ?
					<FontedText style={{
						marginLeft: 5, marginBottom: 5, fontSize: 18,
						fontWeight: 'bold'
					}} >
						{`Note : `}
						<FontedText style={{ fontSize: 15, fontWeight: '200' }} >
							{item.Note}
						</FontedText>
					</FontedText> : null}

				{/* {item.Note ? <FontedText style={{ marginLeft: 5 }} >{`${item.Note}`}</FontedText> : null} */}

			</View>
		)
	}
	render() {
		const { dataFitched, mainColor, largePagePadding } = this.state
		if (!dataFitched) {
			return null
		}
		return (
			<LazyContainer>
				<CustomHeader
					navigation={this.props.navigation}
					title="TrackingHistory"
					leftComponent='back'
				/>

				<Timeline
					innerCircleType='dot'
					showTime={false}
					separator={false}
					circleColor={mainColor}
					lineColor={mainColor}
					titleStyle={{
						marginTop: -15,
						fontSize: 18,
					}}
					descriptionStyle={{
						marginTop: 3,
						marginBottom: 40,
					}}
					style={{
						paddingHorizontal: 0,
						marginVertical: 0,
						paddingVertical: 0,
					}}
					flatListProps={{
						contentContainerStyle: {
							padding: largePagePadding,
						}
					}}
					renderDetail={this.renderItem}
					keyExtractor={item => String(item.Id)}
					data={this.state.timeline_data} />
			</LazyContainer>
		)
	}
}