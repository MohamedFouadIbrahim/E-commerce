import React, { Component } from 'react'
import { View, ScrollView, FlatList } from 'react-native'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import RemoteDataContainer from '../../../partial_components/Common/RemoteDataContainer';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import GridProduct from '../../../partial_components/Theme26/GridProduct';
import PopupsSlider from '../../../partial_components/Theme26/PopupsSlider';
import { screenWidth } from '../../../constants/Metrics';
import { PopupsListProps } from '../../../utils/PopupsSliderList';
import GridProductsList from '../../../partial_components/Theme26/GridProductsList';

export default class MonthlyOffers extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showFooter: false
        }
        const {
            DefaultProductSize
        } = this.props

        switch (DefaultProductSize.Value) {
            case 1:
                this.numColumns = 4
                break
            case 2:
                this.numColumns = 3
                break
            case 3:
                this.numColumns = 2
                break
            case 4:
                this.numColumns = 1
                break
            default:
                this.numColumns = 2

        }
    }
    renderMonthlyOffers = ({ item, index }) => {
        return (
            <GridProduct
                width={this.numColumns}
                navigation={this.props.navigation}
                pushNavigation={true}
                item={item}
                index={index}
            />

            // <View style={{ alignSelf: this.numColumns == 1 ? 'center' : 'center' }} >

            // </View>

        )
    }


    render() {
        const {
            pagePadding,
            largePagePadding,
            mainScreen,
            data: {
                TopPopups = [],
                BottomPopups = []
            },
            onDataFetch
        } = this.props

        return (
            <LazyContainer>
                <CustomHeader
                    navigation={this.props.navigation}
                    mainScreen={mainScreen}
                    title={"HotDeals"}
                    leftComponent="drawer" />
                <GridProductsList
                    numColumns={this.numColumns}
                    url={"Offers/hot"}

                    onDataFetched={(dat, fulldata) => {
                        if (fulldata.TotalItemLength == dat.length) {
                            this.setState({ showFooter: true })
                        }
                        onDataFetch && onDataFetch(fulldata)
                    }}
                    navigation={this.props.navigation}

                    {...PopupsListProps(TopPopups, BottomPopups, true, this.state.showFooter, 'hotTopPopups', 'hotBottomPopups', {
                        navigation: this.props.navigation,
                    }, {
                        navigation: this.props.navigation,
                    })}
                />
            </LazyContainer>
        )
    }
}