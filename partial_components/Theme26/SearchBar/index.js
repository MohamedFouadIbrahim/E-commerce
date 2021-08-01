import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, TextInput, I18nManager, Platform } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { withLocalize } from 'react-localize-redux';
import CustomTouchable from '../../Common/CustomTouchable';

class SearchBar extends Component {
	constructor(props) {
		super(props)

		this.state = {
			searchingFor_UI: '',
		}

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
			mainColor,
			textColor1,
			textColor2,
			iconColor1,
			bgColor2,
			borderRadius,
			pagePadding,
			style,
			showSearchIcon = true
		} = this.props

		const { searchingFor_UI } = this.state

		return (
			<View
				style={[{
					padding: pagePadding,
					borderRadius,
					flexDirection: 'row',
					alignItems: 'center',
					backgroundColor: bgColor2,
				}, style]}>
				{showSearchIcon && <Ionicons
					name="ios-search"
					color={iconColor1}
					size={20}
					style={{
						marginRight: 10,
					}} />}

				<TextInput
					style={{
						flex: 1,
						fontSize: style.fontSize || 18,
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
					onPress={() => {
						if ((searchingFor_UI != null) && (searchingFor_UI != '')) {
							this.onSearch('')
						}
					}}>
					<Ionicons
						name="ios-close"
						color={iconColor1}
						size={30}
					/>
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