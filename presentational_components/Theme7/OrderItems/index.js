import React, { Component } from 'react'
import { View } from 'react-native'
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import LazyContainer from '../../../partial_components/Common/LazyContainer'
import FontedText from '../../../partial_components/Common/FontedText';
import RemoteDataContainer from '../../../partial_components/Common/RemoteDataContainer';
import ItemSeparator from '../../../partial_components/Common/ItemSeparator';
import { withLocalize } from 'react-localize-redux';
import RemoteImage from '../../../partial_components/Common/RemoteImage';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import PriceText from '../../../partial_components/Common/PriceText';

class OrderItems extends Component {
    constructor(props) {
        super(props)
        
        this.orderId = this.props.route.params?.Id

        this.state = {
            data: null,
            triggerRefresh: false,
            deleteModalShown: false,
            quantityModalShown: false,
            updateOrderPrice: true,
            updatedQuantity: null,
            showCustomSelectorForDeleteref: false,
            Loading: false
        }
    }

    renderItem = ({ item, index }) => {
        const { pagePadding, textColor2, navigation } = this.props;
        const { Product, Qty, UnitPrice, ExtraDetails1, ExtraDetails2 } = item
        const { ProductId, Name, ShortDescription, Icon: { ImageUrl } } = Product
        return (
            <CustomTouchable
                onPress={() => {
                    navigation.navigate('OrderItem', {
                        Id: ProductId,
                        Qty,
                        UnitPrice,
                        ExtraDetails1,
                        ExtraDetails2,
                    })
                }}
                style={{
                    borderRadius: 2,
                    justifyContent: 'space-between',
                    marginHorizontal: pagePadding,
                    marginVertical: pagePadding
                }}>
                <View style={{ flexDirection: 'row', flex: 1, }}>
                    <RemoteImage
                        resizeMode='cover'
                        style={{ flex: 0.4 }}
                        uri={ImageUrl}
                    />

                    <View style={{ justifyContent: 'center', paddingHorizontal: pagePadding, flex: 0.6 }}>
                        <FontedText style={{ fontSize: 15 }}>{Name}</FontedText>
						<FontedText style={{ color: textColor2, fontSize: 15, marginBottom: 5, marginTop: -2 }}>{ShortDescription}</FontedText>
                        <PriceText contentContainerStyle={{ marginBottom: 9 }} style={{ fontSize: 15 }}>{UnitPrice}</PriceText>
                    </View>
                </View>
            </CustomTouchable>
        )
    }

    onChildChange = () => {
        this.setState({ triggerRefresh: !this.state.triggerRefresh })
    }

    render() {
        return (
            <LazyContainer>
                <CustomHeader
                    navigation={this.props.navigation}
                    title="Items"
                    leftComponent='back'
                />

                <RemoteDataContainer
                    url={"Order/Items"}
                    params={`orderId=${this.orderId}`}
                    pagination={false}
                    onDataFetched={(data) => {
                        this.setState({ data })
                    }}
                    updatedData={this.state.data}
                    triggerRefresh={this.state.triggerRefresh}
                    keyExtractor={({ OrderLineId }) => `${OrderLineId}`}
                    ItemSeparatorComponent={() => <ItemSeparator />}
                    renderItem={this.renderItem} />

            </LazyContainer>
        )
    }
}

export default withLocalize(OrderItems)