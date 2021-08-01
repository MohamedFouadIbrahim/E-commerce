import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GetSubStore } from '../../services/SubStoreService';
import { RemoveLikeSubStore, LikeSubStore } from '../../services/SubStoreService';
import { ShareSomeThing } from '../../utils/Share';

class SubStore extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Data: null,
            dataFetched: false
        }

        this.Id = this.props.route.params?.Id
    }

    onLikePress = (Id, isLike) => {

        if (isLike) {
            RemoveLikeSubStore(Id, () => {
                this.onChildChange()
            })
        } else {
            LikeSubStore(Id, () => {
                this.onChildChange()
            })
        }

    }

    fetchData = () => {
        GetSubStore(this.Id, res => {
            this.setState({
                Data: { ...res.data },
                dataFetched: true
            })
        })
    }
    onChildChange = () => {
        const { onChildChange } = this.props.route.params
        onChildChange && onChildChange()
        this.fetchData()
    }

    componentDidMount() {
        this.fetchData()
    }

    onSharePress = () => {
        const { AppUrl } = this.props
		const url = `${AppUrl.Url}/s/${this.Id}`
		ShareSomeThing(url, url)
    }

    render() {
        let PresentationalComponent = require('../../presentational_components/Common/SubStore').default

        const {
            dataFetched,
            Data,
        } = this.state


        if (!dataFetched) {
            return null
        }

        return (
            <PresentationalComponent
                Id={this.Id}
                onLikePress={(Id, isLike) => { this.onLikePress(Id, isLike) }}
                onSharePress={this.onSharePress}
                item={Data}
                {...Data}
                {...this.props} />
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
            AppUrl
        },
    },
}) => ({
    AppUrl,
    store_theme_id,
    ...colors,
    ...styles,
})

export default connect(mapStateToProps)(SubStore)