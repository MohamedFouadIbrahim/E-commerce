import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, TextInput, I18nManager } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { withLocalize } from 'react-localize-redux';
import { secondHeaderIconSize } from '../../Common/CustomHeader';

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
			bgColor2,
			iconColor1,
			textColor1,
			textColor2,
			pagePadding,
			style,
		} = this.props

		return (
			<View
				style={[{
					backgroundColor: bgColor2,
					flexDirection: 'row', 
					justifyContent: 'center',
					alignItems: 'center',
					paddingLeft: pagePadding, 
				}, style]}>
				<Feather 
					name="search"
					color={iconColor1}
					size={secondHeaderIconSize} 
					style={{
						marginRight: 10,
					}} />

				<TextInput
					style={{
						flex: 1,
						fontSize: 18,
						color: textColor1,
						textAlign: I18nManager.isRTL ? 'right' : 'left',
						paddingLeft: 0,
						marginLeft: 0,
						paddingVertical: pagePadding,
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