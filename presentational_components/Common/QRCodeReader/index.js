import React, { Component } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner'
import CustomHeader, { headerHeight } from '../../../partial_components/Common/CustomHeader';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import { RNCamera } from 'react-native-camera'
import { screenHeight } from '../../../constants/Metrics';

export default class QRCodeReader extends Component {
	render() {
		const {
			onRead,
			displayDrawer,
		} = this.props

		return (
			<LazyContainer>
				<CustomHeader
					navigation={this.props.navigation}
					title={"QRCodeReader"}
					subTitle={"QRCodeReaderTitle"}
					leftComponent={displayDrawer ? "drawer" : "back"} />

				<QRCodeScanner
					onRead={onRead}
					reactivate={true}
					reactivateTimeout={3000}
					showMarker={true}
					flashMode={RNCamera.Constants.FlashMode.off}
					topContent={null}
					bottomContent={null}
					containerStyle={{
						flex: 1,
						padding: 0,
						marging: 0,
					}}
					cameraStyle={{ height: screenHeight - headerHeight }}
				/>
			</LazyContainer>
		)
	}
}