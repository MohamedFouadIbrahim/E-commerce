import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LikeSubStore, RemoveLikeSubStore } from '../../services/SubStoreService';

class SubStores extends Component {

    state = {
        triggerRefresh: false,
        data: []
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


    componentDidMount() {
        this.focasEvent = this.props.navigation.addListener('focus', () => {
            this.onChildChange()
        })
    }

    componentWillUnmount() {
        this.focusEvent()
    }

    onChildChange = () => {
        this.setState({ triggerRefresh: !this.state.triggerRefresh })
    }

    render() {
        let PresentationalComponent = null

        const {
            store_theme_id,
            ...restProps
        } = this.props


        switch (store_theme_id) {
            case 7:
                PresentationalComponent = require('../../presentational_components/Theme7/SubStoreList').default
                break;
            case 26:
                PresentationalComponent = require('../../presentational_components/Theme26/SubStores').default
                break;
            default:
                PresentationalComponent = require('../../presentational_components/Theme26/SubStores').default
                break;
        }

        return (
            <PresentationalComponent
                url={this.props.route.params?.Favourite ? 'SubStore/MyFavorite' : 'SubStore/List'}
                onChildChange={this.onChildChange}
                triggerRefresh={this.state.triggerRefresh}
                onLikePress={(Id, isLike) => { this.onLikePress(Id, isLike) }}
                mainScreen={true}
                data={this.state.data}
                onDataFetch={(data) => {
                    this.setState({ data })
                }}
                {...restProps} />
        )
    }
}

const mapStateToProps = ({
    runtime_config: {
        runtime_config: {
            screens: {
                Product_Details_09_5: {
                    ShowTextOnImage,
                }
            },
            themes: {
                store_theme_id,
            },
            colors,
            styles,
        },
    },
}) => ({
    store_theme_id,
    ShowTextOnImage,
    ...colors,
    ...styles,
})


export default connect(mapStateToProps)(SubStores)