import React, { PureComponent } from 'react'
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import MapView, { Marker } from 'react-native-maps';
import FontedText from '../FontedText';
import { OpenGoogleMaps, GetCurrentPosition } from '../../../utils/Location';
import TranslatedText from '../TranslatedText';

class CustomMapView extends PureComponent {
	constructor() {
		super()

		this.state = {}
	}

	onMapReady = () => {
		setTimeout(() => {
			GetCurrentPosition(({ latitude, longitude }) => {
				this.setState({ UserLat: latitude, UserLng: longitude })

				const {
					markers = [],
				} = this.props

				this.map && this.map.fitToCoordinates([
					{
						latitude,
						longitude
					},
					...markers
				], {
					edgePadding: { top: 80, right: 80, bottom: 80, left: 80 },
					animated: true,
				})
			})
		}, 1000);
	}

	render() {
		const {
			mainColor,
			style,
			markers = [],
			...restProps
		} = this.props

		const {
			UserLat,
			UserLng
		} = this.state

		return (
			<MapView
				ref={ref => {
					this.map = ref;
				}}
				style={style || {
					...StyleSheet.absoluteFillObject,
				}}
				onMapReady={this.onMapReady}
				showsUserLocation={false}
				followsUserLocation={false}
				{...restProps}>
				{markers.map(({ latitude, longitude, Name }, index) => (
					[<Marker
						key={`${index}_0`}
						coordinate={{
							latitude,
							longitude,
						}}
						pinColor={mainColor}
						onPress={(e) => {
							const { latitude, longitude } = e.nativeEvent.coordinate
							OpenGoogleMaps(latitude, longitude)
						}} />,
					<Marker
						key={`${index}_1`}
						coordinate={{
							latitude,
							longitude,
						}}>
						{Name && <FontedText style={{ color: mainColor, fontWeight: 'bold', marginBottom: 50, }}>{Name}</FontedText>}
					</Marker>]
				))}

				{UserLat && UserLng && [<Marker
					key={`MyLocation_0`}
					coordinate={{
						latitude: UserLat,
						longitude: UserLng,
					}}
					pinColor={"#1296DB"} />,
				<Marker
					key={`MyLocation_1`}
					coordinate={{
						latitude: UserLat,
						longitude: UserLng,
					}}>
					<TranslatedText style={{ color: 'black', marginBottom: 50, }} text="MyLocation" />
				</Marker>]}
			</MapView>
		)
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

export default connect(mapStateToProps)(CustomMapView)