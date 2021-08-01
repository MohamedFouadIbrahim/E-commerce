import React, { PureComponent } from 'react'
import { Linking, View } from 'react-native';
import { connect } from 'react-redux'
import CustomImagesSlider from '../CustomImagesSlider';
import { onPressCategory } from '../../../utils/Categories';
import { isValidURL } from '../../../utils/Validation';
import { GetCategory } from '../../../services/CategoryService';
import { SeenPop } from '../../../services/PopService';
import { processPressedNotification } from '../../../utils/Notifications';
import { screenWidth } from '../../../constants/Metrics';
class PopupsSlider extends PureComponent {

    constructor(props) {
        super(props)

    }

    onPressCategory = (item) => {
        const {
            pushNavigation = false
        } = this.props
        onPressCategory(this.props.navigation, item, "Categories_Alt", pushNavigation)
    }

    onPressSliderImage = (item) => {
        const {
            navigation,
            pushNavigation
        } = this.props

        const {
            Navigation: PageV,
            NavigationTo: PageValue1,
            Id,
            SendSeen
        } = item

        if (SendSeen) {
            SeenPop(Id)
        }


        if (PageV === "Url" && PageValue1 && isValidURL(PageValue1)) {
            Linking.openURL(PageValue1)
        }
        else if (PageV) {
            const customNotification = {
                _data: {
                    type: "navigation",
                    routeName: PageV === "Categories" ? "Categories_Alt" : PageV,
                    params: PageValue1,
                }
            }

            if (PageV === "Category") {
                const parsedParams = PageValue1 && PageValue1.length ? JSON.parse(PageValue1) : undefined

                if (parsedParams) {
                    const Id = parsedParams

                    GetCategory(Id, res => {
                        this.onPressCategory(res.data)
                    })
                }
            }

            else if (PageV === "Product") {
                if (pushNavigation) {
                    navigation.push('Product', {
                        screen: 'Product',
                        params: {
                            Id: PageValue1
                        }
                    })
                } else {
                    navigation.navigate('Product', {
                        screen: 'Product',
                        params: {
                            Id: PageValue1
                        }
                    })
                }

            }
            else if (PageV !== "NoNavigation") {
                processPressedNotification(customNotification, navigation, false)
            }
        }
    }

    onPressAdsSliderImage = ({ index }) => {
        const {
            images = [],
        } = this.props

        this.onPressSliderImage(images[index])
    }

    render() {
        const {
            imageStyle,
            borderRadius,
            largePagePadding,
            name,
            images = [],
            contentContainerStyle,
            top = false,
            pagePadding,
            DisableInternalPadding = false,
            ...restProps
        } = this.props

        if (images && images.map(item => item.Icon).filter(item => item != null).length > 0) {
            return (
                <View style={contentContainerStyle} >
                    <CustomImagesSlider
                        images={images.map(item => item.Icon).filter(item => item != null)}
                        name={name}
                        dimension={720}
                        original={true}
                        ShowSliderBullets={true}
                        style={{
                        }}
                        imageStyle={[{
                            borderRadius,
                            marginHorizontal: pagePadding,
                        },
                            imageStyle]}
                        width={(screenWidth - (pagePadding) * 2)}
                        onPressImage={this.onPressAdsSliderImage}
                        {...restProps} />
                </View>

            )
        } else {
            return null
        }
    }
}

const mapStateToProps = ({
    runtime_config: {
        runtime_config: {
            styles,
        },
    },
}) => ({
    ...styles,
})

export default connect(mapStateToProps)(PopupsSlider)