import React, { Component } from 'react'
import { View,  FlatList } from 'react-native'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import CustomHeader, { headerIconSize } from '../../../partial_components/Common/CustomHeader';
import RemoteDataContainer from '../../../partial_components/Common/RemoteDataContainer';
import OrderItem from '../../../presentational_components/Theme7/Orders/OrderItem';


export default class Orders extends Component {

    renderArticle = ({ item, index }) => {
        return (
            <OrderItem
                navigation={this.props.navigation}
                pushNavigation={true}
                item={item}
                index={index} />
        )
    }



    render() {
        const {
            pagePadding,
			mainScreen,
			triggerRefresh,
		} = this.props

        return (
            <LazyContainer>
                <CustomHeader
                    navigation={this.props.navigation}
					mainScreen={mainScreen}
					title={"Orders"}
                    leftComponent="drawer"
                />

                {<RemoteDataContainer
                    url={"Orders"}
                    refresh={true}
					triggerRefresh={triggerRefresh}
					keyExtractor={({ Id }) => `${Id}`}
                    numColumns={2}
                    contentContainerStyle={{
                        paddingVertical: pagePadding,
                    }}
                    ItemSeparatorComponent={
                        () => <View style={{ height: 10, backgroundColor: 'transparent' }} />
                    }
                    renderItem={this.renderArticle} />}

            </LazyContainer>
        )
    }
}