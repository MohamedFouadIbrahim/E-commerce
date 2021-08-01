import React, { PureComponent } from 'react'
import { View, TextInput, I18nManager, Image } from 'react-native'
import { connect } from 'react-redux'
import { LongToast } from '../../../utils/Toast';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontedText from '../FontedText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { formatDate, formatTime, removeFromDate, addToDate } from '../../../utils/Date';
import CustomDatePicker from '../CustomDatePicker';
import { withLocalize } from 'react-localize-redux';
import MapView, { Marker } from 'react-native-maps';
import { screenWidth } from '../../../constants/Metrics';
import TranslatedText from '../TranslatedText';
import { GetCurrentPosition } from '../../../utils/Location';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import RoundedInput from '../../Theme26/RoundedInput';
import Icon from '../../Common/Icon';
import CustomSelector from '../CustomSelector';
import RoundedSelector from '../RoundedSelector';
import { shadowStyle2 } from '../../../constants/Style';
import { SelectEntity } from '../../../utils/EntitySelector';
import { TrimText } from '../../../utils/Text';

class ProductOptionsList extends PureComponent {
	constructor(props) {
		super(props)

		const { data, type } = this.props

		this.state = {
			isDateTimePickerVisible: false,
			isMapVisible: false,
			latitude: null,
			longitude: null,
			data,
			type,
		}

		this.ListRef = React.createRef()
		switch (type) {
			case 5:
			case 6:
			case 7:
				const { data } = this.state
				const { value1: minDays, value2: maxDays } = data[0]

				if (minDays && minDays.length) {
					this.minDate = removeFromDate(new Date(), parseInt(minDays))
				}

				if (maxDays && maxDays.length) {
					this.maxDate = addToDate(new Date(), parseInt(maxDays))
				}
				break;
		}
	}

	componentDidMount() {
		const { type } = this.state
		if (type == 10) {
			let output2 = this.state.data
				.filter(item => item.isSelected & !item.IsHidden & !item.IsDisable)
				.map(function (item) { return item; })[0]

			if (output2) {
				this.onSelectOptionData(output2.Name, output2.Id)
			}
		}
	}

	hideDateTimePicker = (callback) => {
		this.setState({ isDateTimePickerVisible: false }, () => { callback && callback() })
	}

	showDateTimePicker = () => {
		this.setState({ isDateTimePickerVisible: true })
	}

	toggleMap = () => {
		const { latitude, longitude, isMapVisible } = this.state
		const newMapState = !isMapVisible

		if (newMapState && (!latitude || !longitude)) {
			GetCurrentPosition(({ latitude, longitude }) => {
				this.onSelectOptionData(latitude, longitude)

				this.setState({
					latitude,
					longitude,
					UserLat: latitude,
					UserLng: longitude,
					isMapVisible: newMapState,
				})
			})
		}
		else {
			this.setState({ isMapVisible: newMapState })
		}
	}

	clearList = () => {
		const {
			selection,
			onSelect
		} = this.props
		if (selection == 1) {

			this.onSelectOptionData(null, null, true)
		} else {

			const multiData = this.state.data.map(mapItem => ({
				...mapItem,
				isSelected: false
			}))

			this.setState({ data: multiData })

			onSelect && onSelect(multiData, multiData.filter(item => item.isSelected))
		}
	}

	onSelectOptionData = (data1, data2, reset = false) => {
		const { type } = this.state
		const { onSelect } = this.props
		let modifiedMembers = this.state.data

		if (type === 4/*location*/) {
			const isSelected = data1 && data2

			modifiedMembers[0].value1 = data1
			modifiedMembers[0].value2 = data2
			modifiedMembers[0].isSelected = isSelected

			this.setState({
				latitude: data1,
				longitude: data2,
				isLocationSelected: isSelected,
			})

			onSelect && onSelect(modifiedMembers)
		}
		else {
			modifiedMembers[0].isSelected = data1 ? true : false

			switch (type) {
				case 5:
					// Date			
					modifiedMembers[0].value1 = formatDate(data1)
					break;
				case 6:
					// Time			
					modifiedMembers[0].value1 = formatTime(data1, true)
					break;
				case 7:
					// Datetime
					modifiedMembers[0].value1 = `${formatDate(data1)} ${formatTime(data1, true)}`
					break;
				case 10:/*list*/
					modifiedMembers.forEach(element => {
						element.isSelected = false
						element.value1 = null
					});

					let selectedItem = modifiedMembers.filter(item => item.Id == data2)[0]
					if (selectedItem && !reset) {
						selectedItem.isSelected = true
						selectedItem.value1 = data1
					} else if (selectedItem && reset) {

						selectedItem.isSelected = false
						selectedItem.value1 = null

					}
					break;
				default:
					modifiedMembers[0].value1 = data1
					break;
			}

			if (reset) {
				onSelect && onSelect(this.props.data)
				this.setState({ output: null })
			} else {
				onSelect && onSelect(modifiedMembers)
				this.setState({ output: data1 })
			}

		}
	}

	onPressItem = (item) => {
		const { selection, onSelect } = this.props

		switch (selection) {
			case 1:
				// Single selection
				const singleData = this.state.data.map(mapItem => ({
					...mapItem,
					isSelected: mapItem.Id === item.Id ? (item.isSelected ? false : true) : false
				}))

				this.setState({ data: singleData })

				onSelect && onSelect(singleData, singleData.filter(item => item.isSelected))
				break;
			case 2:
				// Multi selection
				const multiData = this.state.data.map(mapItem => ({
					...mapItem,
					isSelected: mapItem.Id === item.Id ? (item.isSelected ? false : true) : mapItem.isSelected
				}))

				this.setState({ data: multiData })

				onSelect && onSelect(multiData, multiData.filter(item => item.isSelected))
				break;
		}
	}

	onLongPressItem = (item) => {
		LongToast(item.Name, false)
	}

	renderColor = (item, index) => {
		if (item.IsHidden) {
			return null
		}
		const { value1: Color, isSelected } = item
		const { bgColor2, textColor2 } = this.props

		return (
			<View>
				<CustomTouchable
					disabled={item.IsDisable}
					key={index}
					onPress={() => { this.onPressItem(item) }}
					onLongPress={() => this.onLongPressItem(item)}
					style={{
						...shadowStyle2,
						width: 36,
						height: 36,
						borderRadius: 18,
						backgroundColor: Color,
						justifyContent: 'center',
						alignItems: 'center',
						marginBottom: 15,
						marginRight: 15,
						opacity: item.IsDisable ? 0.2 : 1,
					}}>

					{item.IsDisable && <Image
						style={{ alignSelf: 'center', height: 30, }}
						source={require('../../../assets/images/res/nan.png')}
						resizeMode="contain"
					/>}
					{isSelected && <FontAwesome name="check" color={bgColor2} size={16} />}
				</CustomTouchable>

			</View>
		)
	}

	renderCode = (item, index) => {
		if (item.IsHidden) {
			return null
		}
		const { value1: ShortCode, isSelected } = item
		const { mainColor, bgColor2, textColor2 } = this.props

		return (
			<CustomTouchable
				key={index}
				disabled={item.IsDisable}
				onPress={() => this.onPressItem(item)}
				onLongPress={() => this.onLongPressItem(item)}
				style={{
					height: 36,
					paddingHorizontal: 15,
					borderRadius: 18,
					backgroundColor: 'transparent',
					borderColor: isSelected ? mainColor : textColor2,
					borderWidth: 1,
					justifyContent: 'center',
					alignItems: 'center',
					marginBottom: 15,
					marginRight: 15,
					opacity: item.IsDisable ? 0.2 : 1,
				}}>
				{item.IsDisable && <Image
					style={{ alignSelf: 'center', height: 30, flex: 1, position: 'absolute' }}
					source={require('../../../assets/images/res/nan.png')}
					resizeMode="contain"
				/>}
				<FontedText style={{ color: isSelected ? mainColor : textColor2, fontSize: 14, }}>{ShortCode}</FontedText>
			</CustomTouchable>
		)
	}


	static getDerivedStateFromProps(props, state) {

		if (props.disabledRefresh == true) {
			return { ...state }
		}
		return {
			...props
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {

		if (prevProps.reset) {
			const { data, type, selection } = prevProps
			this.setState({
				isDateTimePickerVisible: false,
				isMapVisible: false,
				latitude: null,
				longitude: null,
				data,
				type,
				output: null
			})

			if (type == 8) {
				this.setState({ output: '1' })
				this.onSelectOptionData("1")
			}

			switch (type) {
				case 5:
				case 6:
				case 7:
					const { value1: minDays, value2: maxDays } = data[0]

					if (minDays && minDays.length) {
						this.minDate = removeFromDate(new Date(), parseInt(minDays))
					}

					if (maxDays && maxDays.length) {
						this.maxDate = addToDate(new Date(), parseInt(maxDays))
					}
					break;
			}

			switch (selection) {
				case 1:
					// Single selection
					const singleData = this.state.data.map(mapItem => ({
						...mapItem,
						isSelected: false
					}))

					this.setState({ data: singleData })

					break;
				case 2:
					// Multi selection
					const multiData = this.state.data.map(mapItem => ({
						...mapItem,
						isSelected: false
					}))

					this.setState({ data: multiData })

					break;
			}

		}
	}

	renderIcon = (item, index) => {
		if (item.IsHidden) {
			return null
		}
		const { mainColor, textColor2 } = this.props
		const { value1: MobileIcon, value2: MobileIconFamily, isSelected } = item

		return (
			<CustomTouchable
				disabled={item.IsDisable}
				key={index}
				onPress={() => this.onPressItem(item)}
				onLongPress={() => this.onLongPressItem(item)}
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					marginBottom: 15,
					height: 36,
					marginRight: 15,
					borderColor: isSelected ? mainColor : textColor2,
					borderWidth: 1,
					borderRadius: 18,
					paddingHorizontal: 10,
					opacity: item.IsDisable ? 0.2 : 1,
				}}>
				{item.IsDisable && <Image
					style={{ alignSelf: 'center', height: 30, flex: 1, position: 'absolute' }}
					source={require('../../../assets/images/res/nan.png')}
					resizeMode="contain"
				/>}

				<Icon
					family={MobileIconFamily}
					name={MobileIcon}
					color={isSelected ? mainColor : textColor2}
					size={30} />
			</CustomTouchable>
		)
	}

	clearSelectedLocation = () => {
		this.onSelectOptionData(null, null)
	}

	renderLocation = () => {
		const { mainColor } = this.props
		const { isMapVisible, isLocationSelected, latitude, longitude, } = this.state

		let iconName, onPressAction

		if (isMapVisible) {
			iconName = "check-circle"
			onPressAction = this.toggleMap
		}
		else if (isLocationSelected) {
			iconName = "close-circle"
			onPressAction = this.clearSelectedLocation
		}
		else {
			iconName = "plus-circle"
			onPressAction = this.toggleMap
		}

		return (
			<CustomTouchable
				onPress={onPressAction}
				style={{
					flexDirection: 'row',
					alignItems: 'center',
				}}>
				<MaterialCommunityIcons
					name={iconName}
					size={36}
					color={mainColor}
					style={{
						marginRight: 5,
						marginBottom: 5,
					}} />
			</CustomTouchable>
		)
	}

	clearDateTimePicker = () => {
		this.onSelectOptionData(null)
	}

	renderDatetime = (type) => {
		const { mainColor } = this.props
		const { output } = this.state

		let displayedOutput

		if (output) {
			switch (type) {
				case 5:
					// Date			
					displayedOutput = formatDate(output)
					break;
				case 6:
					// Time			
					displayedOutput = formatTime(output)
					break;
				case 7:
					// Datetime
					displayedOutput = `${formatDate(output)} ${formatTime(output)}`
					break;
			}
		}

		return (
			<CustomTouchable
				onPress={this.showDateTimePicker}
				style={{
					flexDirection: 'row',
					alignItems: 'center',
				}}>
				<CustomTouchable
					onPress={output ? this.clearDateTimePicker : this.showDateTimePicker}
					style={{}}>
					<MaterialCommunityIcons
						name={output ? 'close-circle' : 'plus-circle'}
						size={36}
						color={mainColor} />
				</CustomTouchable>

				{output ? <FontedText style={{ marginLeft: 5 }}>{displayedOutput}</FontedText> : null}
			</CustomTouchable>
		)
	}

	renderTextInput = (type) => {
		const { output } = this.state
		const {
			typName
		} = this.props

		return (
			<RoundedInput
				translatePlaceHolder={false}
				containerStyle={{ flex: 1 }}
				placeholder={'TypeOptionValuePlaceHolder'}
				value={output}
				title={typName}
				onBlur={() => {
					this.onSelectOptionData(this.state.output)
				}}
				keyboardType={type === 8 ? "decimal-pad" : "default"}
				onChangeText={(output) => { this.setState({ output }) }}
			/>
		)
	}

	onMultiListSelect = (items) => {
		const { onSelect } = this.props

		const multiData = this.state.data.map(mapItem => ({
			...mapItem,
			isSelected: items.map(selectedItem => selectedItem.Id == mapItem.Id).includes(true),
			value1: mapItem.Name,
		}))

		this.setState({ data: multiData }, () => {
			onSelect && onSelect(multiData, multiData.filter(item => item.isSelected))
		})
	}

	renderListOption = (type) => {
		const {
			typName,
			selection
		} = this.props

		const ShownData = this.state.data.filter(item => !item.IsHidden & !item.IsDisable)

		//get selectd value
		let output = this.state.data
			.filter(item => item.isSelected & !item.IsHidden & !item.IsDisable)
			.map(function (item) { return item.Name; })[0]

		const shownValue = (dd) => {
			if (dd && selection == 1) {
				return dd
			} else if (dd && selection == 2) {
				return TrimText(this.state.data.filter(ire => ire.isSelected).map(item => item.Name).join(), 20)
			} else {
				return null
			}
		}

		const findSelectedItem = (item) => {
			return !item.IsDisable && !item.IsHidden
		}

		return (
			<View
				style={{ flex: 1, opacity: ShownData.length == 0 ? 0.2 : 1, }}
				pointerEvents={ShownData.length == 0 ? "none" : "auto"}
			>
				<CustomSelector
					ref={this.ListRef}
					options={ShownData.map(item => item.Name)}
					onSelect={(index) => {
						if (!ShownData[index].IsDisable) {
							this.onSelectOptionData(ShownData[index].Name, ShownData[index].Id)
						} else {
							LongToast('not available')
						}
					}}
				/>
				<RoundedSelector
					arrow={output ? false : true}
					onPress={() => {
						if (this.props.selection == 2) {
							SelectEntity(this.props.navigation, item => {
								this.onMultiListSelect(item)
							}, null, null, false, 2, this.state.data.filter(item => item.isSelected == true), { initialData: this.state.data.filter(findSelectedItem) })
						} else {
							this.ListRef.current.show()
						}
					}}
					// title={typName}
					onPressReset={this.clearList}
					resetIcon={output ? true : false}
					value={shownValue(output)}
				/>
			</View>

		)
	}

	renderMainComponent = () => {
		const { type, data } = this.state

		switch (type) {
			case 1:
				// Color
				return data.map(this.renderColor)
			case 2:
				// Code
				return data.map(this.renderCode)
			case 3:
				// Icon			
				return data.map(this.renderIcon)
			case 4:
				// Location			
				return this.renderLocation()
			case 5:
			case 6:
			case 7:
				// Time, date or datetime			
				return this.renderDatetime(type)
			case 8:
			case 9:
				// Length, String		
				return this.renderTextInput(type)
			case 10:
				return this.renderListOption(type)
		}
	}

	renderLocationHelper = () => {
		const {
			isMapVisible,
			latitude,
			longitude,
		} = this.state

		if (isMapVisible && latitude && longitude) {
			const {
				UserLat,
				UserLng,
			} = this.state

			return (
				<View
					style={{
						overflow: "hidden",
						borderRadius: 0,
						marginLeft: -20,
					}}>
					<MapView
						style={{
							width: screenWidth,
							height: 300,
						}}
						initialRegion={{
							latitude,
							longitude,
							latitudeDelta: 0.02,
							longitudeDelta: 0.02,
						}}
						region={{
							latitude,
							longitude,
							latitudeDelta: 0.02,
							longitudeDelta: 0.02,
						}}
						showsUserLocation={true}
						followsUserLocation={true}>
						{[<Marker
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

						<Marker
							draggable
							coordinate={{
								latitude,
								longitude,
							}}
							onDragEnd={(f) => {
								const { latitude, longitude } = f.nativeEvent.coordinate
								this.onSelectOptionData(latitude, longitude)
							}}
						/>
					</MapView>
				</View>
			)
		}
	}

	renderDatetimeHelper = (mode) => {
		const { isDateTimePickerVisible, output } = this.state
		const { minDate, maxDate } = this

		return (
			<CustomDatePicker
				mode={mode}
				isVisible={isDateTimePickerVisible}
				date={output}
				minimumDate={minDate}
				maximumDate={maxDate}
				style={{
				}}
				onDatePicked={(datetime) => {
					this.hideDateTimePicker(() => {
						this.onSelectOptionData(datetime)
					})
				}}
				onCancel={this.hideDateTimePicker} />
		)
	}

	renderHelperComponent = () => {
		const { type } = this.state

		switch (type) {
			case 4:
				// Location			
				return this.renderLocationHelper()
			case 5:
				// Date			
				return this.renderDatetimeHelper('date')
			case 6:
				// Time			
				return this.renderDatetimeHelper('time')
			case 7:
				// Datetime			
				return this.renderDatetimeHelper('datetime')
		}
	}

	render() {
		if (!this.state.type) {
			return null
		}

		const { style, ...restProps } = this.props

		return (
			<View
				style={[{
					flexWrap: 'wrap',
					flexDirection: 'row',
					alignItems: 'center',
				}, style]}
				{...restProps}>
				{this.renderMainComponent()}
				{this.renderHelperComponent()}
			</View>
		)
	}
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			styles,
			colors,
		},
	},
}) => ({
	...styles,
	...colors,
})

export default connect(mapStateToProps)(withLocalize(ProductOptionsList))