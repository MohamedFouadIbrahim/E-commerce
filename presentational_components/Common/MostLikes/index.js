import React from 'react'
import { View } from 'react-native';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import GridProductsList from '../../../partial_components/Theme26/GridProductsList';
import GridProduct from '../../../partial_components/Theme26/GridProduct';
import { PopupsListProps } from '../../../utils/PopupsSliderList';

class MostLikes extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            showFooter: false
        }

        const {
            DefaultProductSize,
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

    render() {
        const {
            largePagePadding,
            pagePadding,
            onDataFetch,
            data: {
                TopPopups = [],
                BottomPopups = []
            },
        } = this.props

        return (
            <LazyContainer>

                <CustomHeader
                    title='MostLikes'
                    navigation={this.props.navigation}
                    leftComponent="drawer"
                />

                <GridProductsList
                    url={"Product/MostLikes"}
                    navigation={this.props.navigation}
                    numColumns={this.numColumns}
                    keyExtractor={({ Id }) => `${Id}`}
                    numColumns={this.numColumns}
                    ItemSeparatorComponent={
                        () => <View style={{ height: pagePadding, backgroundColor: 'transparent' }} />
                    }
                    onDataFetched={(dat, fulldata) => {
                        if (fulldata.TotalItemLength == dat.length) {
                            this.setState({ showFooter: true })
                        }
                        onDataFetch && onDataFetch(fulldata)
                    }}

                    {...PopupsListProps(TopPopups, BottomPopups, true, this.state.showFooter, 'TopPopupsMostLikes', 'BottomPopupsMostLikes', {
                        navigation: this.props.navigation
                    }, {
                        navigation: this.props.navigation
                    })}
                />
            </LazyContainer>
        )
    }
}

export default MostLikes