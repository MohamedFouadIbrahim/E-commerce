import React, { Component } from 'react'
import { View } from 'react-native'
import LazyContainer from '../../../partial_components/Common/LazyContainer'
import FontedText from '../../../partial_components/Common/FontedText';
import RemoteDataContainer from '../../../partial_components/Common/RemoteDataContainer';
import CircularImage from '../../../partial_components/Common/CircularImage';
import ItemSeparator from '../../../partial_components/Common/ItemSeparator';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { withLocalize } from 'react-localize-redux';
import { getFilters } from '../../../services/FilterService.js';
import CustomSelector from '../../../partial_components/Common/CustomSelector';
import ConfirmModal from '../../../partial_components/Common/ConfirmModal';
import CustomModal from '../../../partial_components/Common/CustomModal';
import CustomLoader from '../../../partial_components/Common/CustomLoader';
import RoundedCloseButton from '../../../partial_components/Theme26/CloseButton';
import { EventRegister } from 'react-native-event-listeners'
import { DeleteProductMedia, ReorderProductMedia, AddProductMedia } from '../../../services/ProductService.js';
import { showImagePicker } from '../../../utils/Image.js';
import { LongToast } from '../../../utils/Toast';
import { shadowStyle1 } from '../../../constants/Style';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';

class ProductMedia extends Component {
	constructor(props) {
		super(props)

		this.state = {
			data: null,
			triggerRefresh: false,
			searchBarShown: false,
			searchingFor: '',
			isPopupVisible: false,
			showCustomSelectorForDeleteref: false,
			Loading: false,
			uploadingImg: false,
			ProsessEvent: 0
		}

		this.typeSelectorRef = React.createRef();
		this.deleteRef = React.createRef();
		this.confirmRef = React.createRef();

		this.options = [
			{ Id: 1, Name: this.props.translate('Delete') },
		]
		this.uploadMediaListener = EventRegister.addEventListener('uploadMedia', (uploadMedia) => {
			this.uploadMedia()
		})

		this.listener = EventRegister.addEventListener('currentPost', (currentPost) => {
			if (currentPost == '6') {
				this.onChildChange();
			}
		})
	}

	componentWillUnmount() {
		EventRegister.removeEventListener(this.listener)
		EventRegister.removeEventListener(this.uploadMediaListener)
		this.cancelFetchDatagetFilters && this.cancelFetchDatagetFilters()
		this.cancelFetchDataDeleteProductMedia && this.cancelFetchDataDeleteProductMedia()
		this.cancelFetchDataAddProductMedia && this.cancelFetchDataAddProductMedia()
	}

	componentDidMount() {
		this.cancelFetchDatagetFilters = getFilters({
			articleTypes: true,
		}, res => {
			const {
				ArticleTypes,
			} = res.data
			this.setState({
				ArticleTypes,
			})
		})
	}

	renderItem = ({ item, index, drag, isActive }) => {
		const { largePagePadding, pagePadding, textColor2, bgColor1, bgColor2, iconColor1 } = this.props
		const { productId, Media: { ImageUrl, Name, Alt, Id } } = item

		return (
			<CustomTouchable
				onLongPress={() => {
					this.productId = productId
					this.imageId = Id
					this.deleteRef.current.show()
				}}>
				<View
					style={{
						backgroundColor: isActive ? bgColor2 : bgColor1,
						flexDirection: 'row',
						justifyContent: 'space-between',
						paddingHorizontal: largePagePadding,
						paddingVertical: pagePadding,
					}}>
					<View
						style={{
							flex: 1,
							flexDirection: 'row',
						}}>
						<CircularImage
							uri={ImageUrl} id={index} />

						<View
							style={{
								flex: 1,
								paddingLeft: largePagePadding,
								justifyContent: 'center'
							}}>
							<FontedText style={{}}>{Name}</FontedText>
							{Alt ? <FontedText style={{ color: textColor2 }}>{Alt}</FontedText> : null}
						</View>
					</View>

					<CustomTouchable
						onLongPress={drag}
						style={{
							padding: 10,
						}}>
						<Ionicons
							name={`ios-menu`}
							size={28}
							color={iconColor1} />
					</CustomTouchable>
				</View>
			</CustomTouchable>
		)
	}

	onChildChange = () => {
		this.setState({ triggerRefresh: !this.state.triggerRefresh })
	}

	addParamsSeparator = (params) => {
		return params.length ? '&' : ''
	}

	getRequestParams = () => {
		return `productId=${this.props.route.params?.ProductId}`
	}

	onSelectArticleType = (index) => {
		if (index === 0) {
			this.setState({ Type: null })
		}
		else {
			const { ArticleTypes } = this.state
			this.setState({ Type: ArticleTypes[index - 1] })
		}
	}

	onDataReordered = (data) => {
		this.cancelFetchDataReorderProductMedia = ReorderProductMedia(this.props.route.params?.ProductId, data.map(item => item.Media.Id), (res) => {

		})
	}
	onCloseButtonPress = () => {
		this.cancelFetchDataDeleteProductMedia && this.cancelFetchDataDeleteProductMedia()
		this.setState({ uploadingImg: false, ProsessEvent: 0 })
	}
	uploadMedia = () => {
		showImagePicker(({ uri }) => {
			EventRegister.emit('submitting', true)
			this.setState({ uploadingImg: true, ProsessEvent: 0 })

			this.cancelFetchDataAddProductMedia = AddProductMedia({ Image: uri, productId: this.props.ProductId }, (res) => {
				EventRegister.emit('submitting', false)
				EventRegister.emit('currentPost', '6')
				this.setState({ uploadingImg: false, ProsessEvent: 0 })
			}, (err) => {
				this.setState({ uploadingImg: false, ProsessEvent: 0 })
				EventRegister.emit('submitting', false)

			}, (pros) => {
				this.setState({ uploadingImg: true, ProsessEvent: pros * 0.01 })
			})
		})
	}

	onCloseButtonPress = () => {
		this.cancelFetchDataDeleteProductMedia && this.cancelFetchDataDeleteProductMedia()
		this.setState({ uploadingImg: false, ProsessEvent: 0 })
	}

	render() {
		const { ArticleTypes, Type } = this.state
		const { translate, scrollOffset } = this.props

		return (
			<LazyContainer  >

				<CustomSelector
					ref={this.deleteRef}
					options={this.options.map(item => item.Name)}
					onSelect={(index) => {
						if (index == 0) {
							this.confirmRef.current.show();
						}
					}}
					onDismiss={() => {

					}}
				/>

				<ConfirmModal
					ref={this.confirmRef}
					onConfirm={() => {
						this.cancelFetchDataDeleteProductMedia = DeleteProductMedia({ productId: this.productId, imageId: this.imageId }, () => {
							this.setState({
								data: this.state.data.filter(filterItem => filterItem.Media.Id !== this.imageId),
								showCustomSelectorForDeleteref: false,
								Loading: false,
								triggerRefresh: !this.state.triggerRefresh
							})
							LongToast(translate('dataDeleted'))
						}, () => {
							this.setState({ Loading: false })
						})
					}}
					onResponse={(check) => {

					}}
				/>

				{this.state.uploadingImg == true ?
					<CustomModal
						visible={this.state.uploadingImg}
						style={{ justifyContent: 'center' }}
						contentContainerStyle={{ ...shadowStyle1, alignSelf: 'center', justifyContent: 'center' }}
					>

						<View style={{ position: 'absolute', right: 10, top: 10 }} >
							<Ionicons name="ios-close" size={30} onPress={() => { this.onCloseButtonPress() }} />
						</View>

						<CustomLoader
							style={{ backgroundColor: 'white', borderRadius: 60, position: 'relative' }}
							size={100}
							progress={this.state.prossesEvent == 0 ? this.state.ProsessEvent : this.state.ProsessEvent}
						/>

					</CustomModal>
					: null}

				<RemoteDataContainer
					url={"ProductMng/Images"}
					params={this.getRequestParams()}
					cacheName={"productimages"}
					draggable={true}
					onDragEnd={({ data }) => { this.onDataReordered(data) }}
					onDataFetched={(data) => {
						this.setState({ data })
					}}
					updatedData={this.state.data}
					triggerRefresh={this.state.triggerRefresh}
					keyExtractor={({ Media }) => `${Media.Id}`}
					ItemSeparatorComponent={
						() => <View style={{ height: pagePadding, backgroundColor: 'transparent' }} />
					}
					renderItem={this.renderItem} />



				{ArticleTypes && <CustomSelector
					ref={this.typeSelectorRef}
					options={[
						translate('NoneSelected'),
						...ArticleTypes.map(item => item.Name)
					]}
					onSelect={(index) => { this.onSelectArticleType(index) }}
					onDismiss={() => { }}
				/>}
			</LazyContainer>
		)
	}
}

export default withLocalize(ProductMedia)