import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { AddCartItem } from '../../../services/CartService';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import { IsProductCheckoutEligible } from '../../../utils/Product';
import { LongToast } from '../../../utils/Toast';
import { redColor } from '../../../constants/Theme26/Colors';
import { View, ActivityIndicator } from 'react-native';
import FontedText from '../../Common/FontedText';
import { ProductLike } from '../../../services/ProductService';

class CartButton extends PureComponent {
    constructor(props) {
        super(props)

        const {
            item,
            mainColor,
            bgColor2,
        } = this.props

        this.state = {
            isLiked: this.props.isLiked,
            lockSubmit: false
        }

        this.lockSubmit = false
        this.canAddToCart = IsProductCheckoutEligible(item)

        if (this.canAddToCart) {
            this.buttonColor = mainColor
        }
        else {
            this.buttonColor = bgColor2
        }
    }

    addToCart = () => {
        const {
            onAddedToCart,
        } = this.props

        const {
            Id,
            ProductMinQty,
            hasRequiredProductOptions,
        } = this.props.item

        const {
            canAddToCart
        } = this

        if (canAddToCart) {
            if (hasRequiredProductOptions) {
                this.props.navigation.navigate("ProductOptions", {
                    Id,
                    Quantity: ProductMinQty,
                    onAddToCart: () => { onAddedToCart && onAddedToCart() }
                })
            }
            else {

                this.setState({ lockSubmit: true })
                this.lockSubmit = true
                AddCartItem(Id, ProductMinQty, null, () => {
                    this.setState({ lockSubmit: false })
                    this.lockSubmit = false
                    onAddedToCart && onAddedToCart()
                }, () => {
                    this.setState({ lockSubmit: false })
                    this.lockSubmit = false
                })

            }
        }
        else {
            LongToast("CantAddToCart")
        }
    }

    goToCart = () => {
        this.props.navigation.navigate("Cart")
    }

    onPressLike = () => {
        const { item: { Id } } = this.props
        const { isLiked } = this.state

        ProductLike(Id, !isLiked, () => {
            this.setState({ isLiked: !isLiked })
            LongToast('Sending')
        })
    }

    render() {
        const {
            isAddedToCart,
            largePagePadding,
            bgColor1,
            smallBorderRadius
        } = this.props

        const { isLiked, lockSubmit } = this.state

        const {
            buttonColor,
        } = this

        if (isAddedToCart) {
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 0.1, borderTopColor: buttonColor }} >
                    <AntDesign
                        name={isLiked == true ? "heart" : 'hearto'}
                        style={{ paddingHorizontal: 7, marginHorizontal: largePagePadding / 4 }}
                        color={redColor}
                        size={this.props.iconSize || 18}
                        onPress={() => { this.onPressLike() }}
                    />

                    <CustomTouchable
                        style={{
                            backgroundColor: buttonColor,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                            borderBottomRightRadius: smallBorderRadius,
                        }}
                        onPress={this.goToCart}>

                        <FontedText
                            style={{ paddingHorizontal: 5, paddingVertical: 8, color: bgColor1, fontSize: this.props.fontSize }}
                        >
                            {this.props.translate('Checkout')}
                        </FontedText>
                    </CustomTouchable>
                </View>

            )
        }
        else {
            return (

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 0.1, borderTopColor: buttonColor }} >

                    <AntDesign
                        onPress={() => { this.onPressLike() }}
                        name={isLiked == true ? "heart" : 'hearto'}
                        style={{ paddingHorizontal: 7, marginHorizontal: largePagePadding / 4 }}
                        color={redColor}
                        size={this.props.iconSize || 18}
                    />

                    <CustomTouchable
                        style={{
                            backgroundColor: buttonColor,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                            borderBottomRightRadius: smallBorderRadius,
                        }}
                        onPress={() => {
                            if (lockSubmit) {
                                return
                            }
                            this.addToCart()
                        }}>

                        {lockSubmit == true ?
                            <ActivityIndicator color={bgColor1} style={{ paddingHorizontal: 5, paddingVertical: 8, color: bgColor1 }} /> :
                            <FontedText
                                style={{ paddingHorizontal: 5, paddingVertical: 8, fontSize: this.props.fontSize, color: bgColor1 }}>
                                {this.props.translate('AddToCart')}
                            </FontedText>
                        }

                    </CustomTouchable>
                </View>
            )
        }
    }
}

const mapStateToProps = ({
    runtime_config: {
        runtime_config: {
            styles,
            colors: {
                mainColor,
                bgColor2,
                bgColor1,
            },
        },
    },
}) => ({
    mainColor,
    bgColor2,
    bgColor1,
    ...styles
})


export default connect(mapStateToProps)(CartButton)