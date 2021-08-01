import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetSubStore, ChangeSubStoreImage } from '../../services/SubStoreService';
import { ShareSomeThing } from '../../utils/Share';

class SubStoreProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataFetched: null,
            data: null
        }
    }

    fetchContent = () => {
        const {
            subStoreId
        } = this.props

        GetSubStore(subStoreId, res => {
            this.setState({
                dataFetched: true,
                data: res.data
            })
        })
    }

    onSharePress = () => {
        const { subStoreId, AppUrl } = this.props
        const url = `${AppUrl.Url}/s/${subStoreId}`
        ShareSomeThing(url, url)
    }

    componentDidMount() {
        this.fetchContent()

    }

    ChangeSubStoreImage = (uri) => {

        this.setState({ data: { ...this.state.data, picker_image_uri: uri, uploadingImage: true, prossesEvent: 0 } })

        ChangeSubStoreImage(uri, res => {

            this.setState({ data: { ...this.state.data, uploadingImage: false, prossesEvent: 0 } })

            LongToast('DataSaved')

            this.fetchContent()
        }, err => {

            this.setState({ data: { ...this.state.data, uploadingImage: false, prossesEvent: 0 } })

        }, pro => {
            this.setState({ data: { ...this.state.data, prossesEvent: pro * 0.01 } })

        })
    }

    render() {
        let PresentationalComponent = require('../../presentational_components/Common/SubStoreProfile').default

        const { dataFetched, data } = this.state

        if (!dataFetched) {
            return null
        }
        return (
            <PresentationalComponent
                onSharePress={this.onSharePress}
                fetchContent={this.fetchContent}
                ChangeSubStoreImage={this.ChangeSubStoreImage}
                {...data}
                {...this.props}
            />
        )
    }
}

const mapStateToProps = ({
    login: {
        subStoreId,
        store_type
    },
    runtime_config: {
        runtime_config: {
            screens: {
                Home_12_1: {
                    AllowCustomerToAddProducts,
                },
            },
            AppUrl,
            colors,
            styles,
        },
    },
}) => ({
    AllowCustomerToAddProducts,
    store_type,
    subStoreId,
    AppUrl,
    ...colors,
    ...styles,

})

export default connect(mapStateToProps)(SubStoreProfile)