import React, { Component } from 'react'
import { View } from 'react-native'
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import LazyContainer from '../../../partial_components/Common/LazyContainer'
import FontedText from '../../../partial_components/Common/FontedText';
import RemoteDataContainer from '../../../partial_components/Common/RemoteDataContainer';
import ItemSeparator from '../../../partial_components/Common/ItemSeparator';
import RemoteImage from '../../../partial_components/Common/RemoteImage';
import { withLocalize } from 'react-localize-redux';
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
        const {
            navigation,
			textColor2,
        } = this.props

        const { Product, Qty, UnitPrice, ExtraDetails1, ExtraDetails2 } = item
        const { Id: ProductId, Name, ShortDescription, Icon: { ImageUrl } } = Product
        const canDecrement = Qty > 0

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
                    flexDirection: 'row',
                    marginHorizontal: this.props.pagePadding,
                    flex: 1,
                    marginVertical: this.props.pagePadding
                }}>
                <RemoteImage
					dimension={250}
                    style={{
                        flex: 0.4,
                        borderRadius: 10,
                    }}
                    uri={ImageUrl} />

                <View
                    style={{
                        flex: 0.6,
                        justifyContent: 'center',
                        paddingLeft: 25,
                    }}>
                    <FontedText style={{ fontSize: 18, }}>{Name}</FontedText>
					<FontedText style={{ color: textColor2, fontSize: 15, }}>{ShortDescription}</FontedText>

                    <View
                        style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <PriceText style={{ fontSize: 24, fontWeight: 'bold', }}>{UnitPrice}</PriceText>
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
					title={"Items"}
                    navigation={this.props.navigation}
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