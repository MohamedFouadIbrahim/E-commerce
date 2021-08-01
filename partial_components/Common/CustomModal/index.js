import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Modal from "react-native-modal"
import FontedText from '../FontedText';
import CustomTouchable from '../CustomTouchable';

class CustomModal extends PureComponent {
	closeModal = () => {
		this.props.onClose && this.props.onClose()
	}

	render() {
		const { positionBottom, title, visible, bgColor1, iconColor1, style, radius = 20 } = this.props

		return (
			<Modal
				hideModalContentWhileAnimating={true}
				animationIn={'fadeIn'}
				onSwipeComplete={this.closeModal}
				onBackdropPress={this.closeModal}
				onRequestClose={this.closeModal}
				style={[{
					flex: 1,
					justifyContent: 'flex-end',
					padding: 0,
					margin: 0,
				}, positionBottom ? {
					padding: 0,
					margin: 0
				} : {}, style]}
				isVisible={visible}
				{...this.props}>
				<View
					style={[{
						padding: 20,
						backgroundColor: bgColor1,
						justifyContent: 'center',
						alignItems: 'center',
					},
					{ ...this.props.contentContainerStyle },
					positionBottom ? {
						borderTopRightRadius: 20,
						borderTopLeftRadius: 20,
					} : {
							borderRadius: radius
						}
					]}>
					{this.props.closeButton ? <View
						style={{
							flexDirection: 'row',
							justifyContent: title ? 'space-between' : 'flex-end',
							alignItems: 'center',
							width: '100%',
						}}>
						<FontedText style={{ textAlign: 'left', fontSize: 12 }}>{title}</FontedText>

						<CustomTouchable
							onPress={this.closeModal}
							style={{
								paddingLeft: 5,
							}}>
							<Ionicons name='ios-close' color={iconColor1} size={26} />
						</CustomTouchable>
					</View> : null}

					{this.props.children}
				</View>
			</Modal>
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

export default connect(mapStateToProps)(CustomModal)