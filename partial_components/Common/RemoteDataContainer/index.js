import React, { Component,	} from 'react';
import { withLocalize } from 'react-localize-redux';
import { FlatList, View, Platform } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { connect } from 'react-redux';
import withForwardedRef from 'react-with-forwarded-ref';
import { GetData, GetPaginatedData } from '../../../services/RemoteDataService';
import CustomRefreshControl from '../CustomRefreshControl';
import TranslatedText from '../TranslatedText';
import paddingCalculator from './Helper';

const MAX_CACHED_DATA_LENGTH = 10
class RemoteDataContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			data: this.getInitialData(),
			isRefreshing: false,
			didFetchData: false,
		}

		this.minPageLength = 20
		this.initPagination()

		this.defaultConfig = {
			pagination: true,
			refresh: true,
		}
	}

	componentDidMount() {
		const {
			pagination = this.defaultConfig.pagination,
		} = this.props

		if (pagination) {
			this.fetchPaginatedData()
		}
		else {
			this.fetchData()
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.initialData !== prevProps.initialData) {
			this.overwriteExistingData(this.props.initialData)
		}

		if (this.props.updatedData !== prevProps.updatedData) {
			this.overwriteExistingData(this.props.updatedData)
		}

		if (this.props.triggerRefresh !== prevProps.triggerRefresh) {
			this.refresh()
		}

		if (this.props.params !== prevProps.params) {
			this.reload()
		}
	}

	componentWillUnmount() {
		if (this.cancelRequest) {
			this.cancelRequest()
		}
	}

	overwriteExistingData = (data) => {
		if (this.isCacheEnabled()) {
			this.updateCachedData(data)
		}

		this.setState({
			data
		})
	}

	reorderData = (e) => {
		const { data } = e

		if (this.isCacheEnabled()) {
			this.updateCachedData(data)
		}

		const { onDragEnd } = this.props
		onDragEnd(e)

		this.setState({
			data
		})
	}

	getInitialData = () => {
		const {
			cacheName,
			initialData,
		} = this.props

		if (initialData) {
			return initialData
		}
		else if (cacheName) {
			const {
				cached_data,
			} = this.props

			return cached_data[cacheName] || []
		}
		else {
			return []
		}
	}

	updateCachedData = (data) => {
		const {
			cacheName,
			cacheData,
		} = this.props

		cacheData(cacheName, data.slice(0, MAX_CACHED_DATA_LENGTH))
	}

	isCacheEnabled = () => {
		const {
			pagination = this.defaultConfig.pagination,
			cached_data,
			cacheName,
		} = this.props

		if (cacheName && (
			this.isRefreshing ||
			!pagination || (
				pagination && (
					this.currPage === 0 ||
					!cached_data[cacheName] ||
					cached_data[cacheName].length < MAX_CACHED_DATA_LENGTH
				)
			)
		)) {
			return true
		}
		return false
	}

	initPagination = () => {
		const { skip = 0 } = this.props

		this.currPage = 0
		this.pagesToSkip = skip
		this.isLastPage = false
	}

	onBeforeFetchingData = () => {
		this.setState({ didFetchData: false })
		this.lockFetching = true
	}

	onDataFetched = (data, full_data) => {
		const {
			onDataFetched,
		} = this.props

		if (data && this.isCacheEnabled()) {
			this.updateCachedData(data)
		}

		this.setState({
			didFetchData: true,
			isRefreshing: false,
			data
		})

		this.isRefreshing = false

		onDataFetched && onDataFetched(data, full_data)

		this.lockFetching = false
	}

	fetchPaginatedData = () => {
		if (this.lockFetching) {
			return
		}

		const {
			url,
			params,
			cancelHandler,
		} = this.props

		this.onBeforeFetchingData()

		if (url) {
			if (!this.pagesToSkip) {
				const skippedItemsLength = this.minPageLength * this.currPage

				this.cancelRequest = GetPaginatedData(url, params, skippedItemsLength, this.minPageLength, res => {
					const fetchedData = res.data.Data
					const mergedData = this.currPage === 0 ? fetchedData : [...this.state.data, ...fetchedData]

					this.isLastPage =
						fetchedData.length < this.minPageLength || res.data.TotalItemLength === mergedData.length
							? true : false

					this.onDataFetched(mergedData, res.data)
				})

				cancelHandler && cancelHandler(this.cancelRequest)
			}
			else {
				this.lockFetching = false
				--this.pagesToSkip
				this.setState({ didFetchData: true })
			}
		}
		else {
			this.onDataFetched(this.state.data)
		}
	}

	fetchData = () => {
		if (this.lockFetching) {
			return
		}

		const {
			url,
			params,
			cancelHandler,
		} = this.props

		this.onBeforeFetchingData()

		if (url) {
			this.cancelRequest = GetData(`${url}${params ? `?${params}` : ''}`, res => {
				this.onDataFetched(res.data.Data, res.data)
			})

			cancelHandler && cancelHandler(this.cancelRequest)
		}
		else {
			this.onDataFetched(this.state.data)
		}
	}

	fetchNextPage = () => {
		if (this.lockFetching) {
			return
		}

		++this.currPage
		this.fetchPaginatedData()
	}

	onRefresh = () => {
		this.isRefreshing = true
		this.setState({ isRefreshing: true })
		this.initPagination()

		const {
			pagination = this.defaultConfig.pagination,
		} = this.props

		if (pagination) {
			this.fetchPaginatedData()
		}
		else {
			this.fetchData()
		}
	}

	refresh = () => {
		this.onRefresh()
	}

	reload = () => {
		this.onRefresh()
	}

	renderEmptyComponent = () => {
		const { ListEmptyComponent } = this.props

		if (!this.state.didFetchData) {
			return null
		}
		else if (ListEmptyComponent) {
			return ListEmptyComponent
		}
		else {
			return (
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: 60,
						paddingHorizontal: 30,
					}}>
					<TranslatedText style={{ fontSize: 22, marginTop: 15, }} text="NoContent" />
				</View>
			)
		}
	}

	getPaginationProps = () => {
		const {
			pagination = this.defaultConfig.pagination,
		} = this.props

		if (pagination) {
			return {
				onEndReachedThreshold: 0.5,
				onEndReached: () => {
					if (!this.isLastPage && this.state.didFetchData && !this.lockFetching) {
						this.fetchNextPage()
					}
				},
			}
		}
		else {
			return null
		}
	}

	renderRefreshControl = () => {
		const { refresh = this.defaultConfig.refresh } = this.props

		if (refresh) {
			return (
				<CustomRefreshControl
					refreshing={false}
					onRefresh={this.onRefresh}
				/>
			)
		}
		else {
			return null
		}
	}

	render() {
		const { props } = this

		const {
			draggable,
			hideWhenEmpty,
			numColumns = 1,
			largePagePadding,
			pagePadding,
			ListHeaderComponentStyle,
			contentContainerStyle,
			ListFooterComponentStyle
		} = props

		const PaddingObj = paddingCalculator(numColumns);

		if (!numColumns)
			throw new Error('you must pass num of columns');

		if (this.state.didFetchData && !this.state.data.length && hideWhenEmpty) {
			return null
		}
		else {
			if (draggable) {
				return (
					<DraggableFlatList
						ref={this.props.forwardedRef}
						removeClippedSubviews={true}
						refreshControl={this.renderRefreshControl()}
						{...this.getPaginationProps()}
						{...props}
						ListEmptyComponent={this.renderEmptyComponent}
						data={this.state.data}
						onDragEnd={(e) => this.reorderData(e)} />
				)
			}
			else {
				return (
					<FlatList
						ref={this.props.forwardedRef}
						removeClippedSubviews={true}
						refreshControl={this.renderRefreshControl()}
						{...this.getPaginationProps()}
						{...props}
						numColumns={numColumns}

						columnWrapperStyle={numColumns > 1 ? {

						} : undefined/*not supported in single column rows */}

						style={{
						}}

						contentContainerStyle={[{
							paddingHorizontal: PaddingObj.ContainerHorizontalPadding,
							paddingVertical: PaddingObj.ContainerHorizontalPadding,
							flexGrow: (Platform.OS === 'ios'?0.97/*to avoid flat list freeze */:1),/*to allow footer to stick bottom */
						}, contentContainerStyle]}

						//bottom adds flex-end to make it stick to bottom when few items only available
						ListFooterComponentStyle={[{
							flex: 1,
							justifyContent: 'flex-end',
							marginHorizontal: -1 * PaddingObj.ContainerHorizontalPadding,
							paddingBottom: PaddingObj.ContainerHorizontalPadding
						}, ListFooterComponentStyle]}

						//make top slider stick to top
						ListHeaderComponentStyle={[{
							marginHorizontal: -1 * PaddingObj.ContainerHorizontalPadding,
						}, ListHeaderComponentStyle]}

						ListEmptyComponent={this.renderEmptyComponent}

						//data will be fetched
						data={this.state.data}
					/>
				)
			}
		}
	}
}

const mapStateToProps = ({
	cache: {
		cached_data,
	},
	runtime_config: {
		runtime_config: {
			colors: {
				mainColor,
			},
			styles,
		},
	},
}) => ({
	cached_data,
	mainColor,
	...styles,
})

function mergeProps(stateProps, { dispatch }, ownProps) {
	const {
		actions: {
			cacheData,
		}
	} = require('../../../redux/CacheRedux.js');

	return {
		...ownProps,
		...stateProps,
		cacheData: (name, data) => cacheData(dispatch, name, data),
	};
}

export default connect(mapStateToProps, undefined, mergeProps, { forwardRef: true })(withForwardedRef(withLocalize(RemoteDataContainer)))