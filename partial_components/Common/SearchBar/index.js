import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, TextInput, I18nManager, Platform } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { withLocalize } from 'react-localize-redux';
import { shadowStyle1 } from '../../../constants/Style';
import { headerHeight } from '../CustomHeader';
import CustomTouchable from '../CustomTouchable';

class SearchBar extends Component {
	constructor(props) {
		super(props)

		this.state = {
			searchingFor_UI: '',
		}

		this.Visible = false
		this.searchUpdateInterval = this.props.interval || 600
	}

	onSubmitEditing = (text) => {
		const { onSubmitEditing } = this.props

		onSubmitEditing && onSubmitEditing(text)
	}

	triggerSearch = () => {
		if (this._throttleTimeout) {
			clearTimeout(this._throttleTimeout)
		}

		this.onSubmitEditing(this.state.searchingFor_UI)
	}

	onSearch = (text) => {
		if (this._throttleTimeout) {
			clearTimeout(this._throttleTimeout)
		}

		this.setState({ searchingFor_UI: text })

		this._throttleTimeout = setTimeout(
			() => {
				this.onSubmitEditing(text)
			}, this.searchUpdateInterval)
	}

	onPressClose = () => {
		if (this.state.searchingFor_UI == '' || !this.state.searchingFor_UI) {
			const { onPressClose } = this.props //for hide Serach with preess X
			onPressClose && onPressClose()
		}
		this.setState({ searchingFor_UI: '' }, () => {
			this.triggerSearch()
		})
	}

	render() {
		const {
			visible = false,
		} = this.props;
		if (!visible) {
			return null
		}
		const {
			translate,
			autoFocus = true,
			hideShadow,
			mainColor,
			largePagePadding,
			pagePadding,
			iconColor1,
			textColor1,
			textColor2,
			bgColor1
		} = this.props

		this.Visible = visible

		return (
			<View
				style={[{
					paddingVertical: 5,
					paddingLeft: largePagePadding,
					flexDirection: 'row',
					alignItems: 'center',
					height: headerHeight,
					backgroundColor: bgColor1
				}, hideShadow ? {} : { ...shadowStyle1 }]}>
				<Feather
					name={"search"}
					size={16}
					color={iconColor1}
					style={{
						marginRight: 20,
					}}
				/>

				<TextInput
					style={{
						flex: 1,
						fontSize: 16,
						color: textColor1,
						textAlign: I18nManager.isRTL ? 'right' : 'left',
						paddingLeft: 0,
						marginLeft: 0,
						paddingVertical: Platform.OS == 'ios' ? 10 : 0
					}}
					ref={(input) => this.searchInputRef = input}
					autoFocus={autoFocus}
					value={this.state.searchingFor_UI}
					onChangeText={(text) => this.onSearch(text)}
					onSubmitEditing={() => { this.triggerSearch() }}
					returnKeyType='search'
					placeholder={translate('Search')}
					placeholderTextColor={textColor2}
					underlineColorAndroid='transparent'
					selectionColor={mainColor} />

				<CustomTouchable
					style={{
						paddingLeft: pagePadding,
						paddingRight: largePagePadding,
						height: '100%',
						justifyContent: 'center',
					}}
					onPress={this.onPressClose} >
					<Feather
						name={"x"}
						size={16}
						color={iconColor1} />
				</CustomTouchable>
			</View>
		)
	}
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			colors,
			styles,
		},
	},
}) => ({
	...styles,
	...colors,
})

export default connect(mapStateToProps)(withLocalize(SearchBar))