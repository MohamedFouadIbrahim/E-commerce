import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GetArtical, ArticleLike, ArticleRemoveLike } from '../../services/ArticalService';
import { withLocalize } from 'react-localize-redux';
import { CommonActions } from '@react-navigation/native';

class Article extends Component {
	constructor(props) {
		super(props)

		this.state = {
			loading: false
		}
		this.articleId = this.props.route.params?.Id
	}

	fitchData = () => {

		this.setState({ loading: true })

		GetArtical(this.props.route.params?.Id, res => {
			this.setState({
				data: res.data,
				didFetchData: true,
				loading: false
			})
		})
	}

	componentDidMount() {
		
		this._unsubscribefocus = this.props.navigation.addListener('focus', () => {
			this.fitchData()
		});

		this._unsubscribestate = this.props.navigation.addListener('state', () => {
			this.fitchData()
		});
	}

	componentWillUnmount() {
		this._unsubscribefocus();
		this._unsubscribestate();
	}

	onLikeArticle = (Id) => {
		const { translate } = this.props
		ArticleLike(Id, res => {
			// LongToast(translate('Liked'))
			this.fitchData()
		})
	}

	onRemoveLikeArticle = (Id) => {
		const { translate } = this.props
		ArticleRemoveLike(Id, res => {
			// LongToast(translate('UnLiked'))
			this.fitchData()
		})
	}

	render() {
		let PresentationalComponent = null

		const {
			store_theme_id,
			...restProps
		} = this.props

		const { didFetchData, data, loading } = this.state

		switch (store_theme_id) {
			case 7:
				PresentationalComponent = require('../../presentational_components/Theme7/Article').default
				break;
			case 26:
				PresentationalComponent = require('../../presentational_components/Theme26/Article').default
				break;
			default:
				PresentationalComponent = require('../../presentational_components/Theme7/Article').default
				break;
		}

		return (
			<PresentationalComponent
				onDesLike={this.onRemoveLikeArticle}
				onLike={this.onLikeArticle}
				loading={loading}
				{...data}
				didFetchData={didFetchData}
				{...restProps} />
		)
	}
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			themes: {
				store_theme_id,
			},
			colors,
			styles,
		},
	},
}) => ({
	store_theme_id,
	...colors,
	...styles,
})

export default withLocalize(connect(mapStateToProps)(Article))