import React, { Component } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner'
import CustomHeader, { headerHeight } from '../../../partial_components/Common/CustomHeader';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import { RNCamera } from 'react-native-camera'
import CustomModal from '../../../partial_components/Common/CustomModal';
import CustomButton from '../../../partial_components/Theme7/CustomButton';
import HorizontalInput from '../../../partial_components/Common/HorizontalInput';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import { Dimensions } from 'react-native';

export default class CommissionQRCode extends Component {

	constructor() {
		super()
		this.state = {
			amount: null,
			screenHeight: Dimensions.get('window').height,
			screenWidth: Dimensions.get('window').width,
		}
	}
	componentDidMount() {
		//re render when change orientation
		Dimensions.addEventListener('change', () => {
			this.setState({
				screenHeight: Dimensions.get('window').height,
				screenWidth: Dimensions.get('window').width,
			})
		})
	}


	renderAmountModal = () => {
		const {
			onSubmit,
			showAmountModal,
			openAmountModal,
			isSubmitLocked,
			smallBorderRadius,
			shadowStyle1,
		} = this.props
		const { amount } = this.state

		return (
			<CustomModal
				isVisible={showAmountModal}
				radius={smallBorderRadius}
				style={{ ...shadowStyle1, flex: 1, }}
				contentContainerStyle={{ ...shadowStyle1, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', }}
				closeButton={true}
				onClose={() => {
					openAmountModal(false)
					this.setState({ showAmountModal: false })
				}}>
				<HorizontalInput
					label="Amount"
					keyboardType="number-pad"
					value={amount != null ? String(amount) : null}
					onChangeText={(text) => {
						this.setState({ amount: text })
					}} />


				<CustomButton title='Submit'
					onPress={() => {
						onSubmit(amount)

					}}
					loading={isSubmitLocked}
					style={{ borderRadius: 10, }}
				/>

			</CustomModal>
		)
	}
	renderSuccessModal = () => {
		const {
			smallBorderRadius,
			shadowStyle1,
			showSuccessModal,
			openSuccessModal,
		} = this.props
		return (
			<CustomModal
				isVisible={showSuccessModal}
				radius={smallBorderRadius}
				style={{ ...shadowStyle1, flex: 1, }}
				contentContainerStyle={{ ...shadowStyle1, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', }}
				closeButton={true}
				onClose={() => {
					openSuccessModal(false)
				}}
			>
				<TranslatedText text={"PlacedOrder"} style={{ fontSize: 20, fontWeight: 'bold', marinBottom: 20 }}></TranslatedText>

				<CustomButton title='Ok'
					onPress={() => {
						openSuccessModal(false)
						this.props.navigation.goBack()
					}}
					style={{ borderRadius: 10, marginTop: 20, paddingHorizontal: 20 }}
				/>

			</CustomModal>
		)
	}

	render() {
		const {
			onRead,
		} = this.props
		const {
			screenHeight,
			screenWidth
		} = this.state
		return (
			<LazyContainer>
				<CustomHeader
					navigation={this.props.navigation}
					title={"QRCodeReader"}
					subTitle={"QRCodeReaderTitle"}
					leftComponent={"drawer"} />

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
					cameraStyle={{ height: screenHeight - headerHeight, width: screenWidth }}
				/>

				{this.renderAmountModal()}
				{this.renderSuccessModal()}

			</LazyContainer>
		)
	}
}