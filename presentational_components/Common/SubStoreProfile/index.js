import React from 'react';
import { ScrollView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import ArrowItem from '../../../partial_components/Common/ArrowItem';
import CircularImage from '../../../partial_components/Common/CircularImage';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import CustomLoader from '../../../partial_components/Common/CustomLoader';
import CustomRefreshControl from '../../../partial_components/Common/CustomRefreshControl';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import FontedText from '../../../partial_components/Common/FontedText';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import PriceText from '../../../partial_components/Common/PriceText';
import RemoteImageBackground from '../../../partial_components/Common/RemoteImageBackground';
import SettingsSeparator from "../../../partial_components/Common/Settings/SettingsSeparator";
import SettingsTitle from "../../../partial_components/Common/Settings/SettingsTitle";
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import StarRating from '../../../partial_components/Theme26/CustomStar';
import { showImagePicker } from '../../../utils/Image';


class SubStoreProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }

    }


    renderImage = () => {
        const {
            picker_image_uri, Image: { ImageUrl }
        } = this.props
        const { iconColor1 } = this.props
        const imageSize = 110

        return (
            <CustomTouchable
                onPress={() => {
                    showImagePicker(({ uri }) => {
                        this.props.ChangeSubStoreImage(uri)
                    })
                }}
                style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 25,
                }}>
                {
                    picker_image_uri ?
                        <CircularImage
                            uri={picker_image_uri}
                            size={imageSize} /> :
                        <CircularImage
                            uri={ImageUrl}
                            size={imageSize} />
                }

                <FontAwesome
                    style={{
                        position: 'absolute',
                        right: 4,
                        bottom: 8,
                    }}
                    name={`camera`}
                    size={20}
                    color={iconColor1} />

                {this.props.uploadingImage == true ?
                    <CustomLoader
                        size={imageSize - 30}
                        progress={this.props.prossesEvent == 0 ? this.props.prossesEvent : this.props.prossesEvent}
                    />
                    : null
                }
            </CustomTouchable>
        )
    }

    renderHeader = () => {
        const {
            Name, Description, Image: { ImageUrl },
            picker_image_uri,
            Rating,
            ProductsCount,
            Likes,
            mainColorText,
            RatingCount,
            bgColor2,
            onSharePress,
            textColor1,
            pagePadding
        } = this.props

        return (
            <RemoteImageBackground
                dimension={720}
                wide={true}
                blurRadius={5}
                style={{ flex: 1, }}
                uri={picker_image_uri ? picker_image_uri : ImageUrl}>
                <LinearGradient
                    colors={['rgba(0, 0, 0, .1)', 'rgba(0, 0, 0, .6)', 'rgba(0, 0, 0, 1)']}
                    style={{
                        flex: 1,
                        paddingVertical: 25,
                    }}>

                    <CustomTouchable
                        onPress={onSharePress}
                        style={{
                            backgroundColor: bgColor2,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'flex-end',
                            width: 35,
                            height: 35,
                            borderRadius: 17.5,
                            marginHorizontal: pagePadding
                        }}>
                        <MaterialCommunityIcons name="share" color={textColor1} size={20} />
                    </CustomTouchable>


                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 25,
                        }}>
                        {this.renderImage()}
                        <FontedText style={{ color: mainColorText, textAlign: 'center' }}>{Name}</FontedText>
                        <FontedText style={{ color: mainColorText, textAlign: 'center' }}>{Description}</FontedText>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                        }}>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                            }}>
                            <FontedText style={{ color: mainColorText, textAlign: 'center' }}>{Likes}</FontedText>
                            <TranslatedText style={{ color: mainColorText, textAlign: 'center' }} text="Likes" />
                        </View>

                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                            }}>
                            <FontedText style={{ color: mainColorText, textAlign: 'center' }}>{ProductsCount}</FontedText>
                            <TranslatedText style={{ color: mainColorText, textAlign: 'center' }} text="ProductsCount" />
                        </View>

                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                marginTop: 5
                            }}>
                            <StarRating rating={Rating} />
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }} >
                                <TranslatedText style={{ color: mainColorText, textAlign: 'center' }} text="Rating" />
                                <FontedText style={{ color: mainColorText, textAlign: 'center' }} >{`(${RatingCount})`}</FontedText>
                            </View>
                        </View>
                    </View>

                </LinearGradient>
            </RemoteImageBackground>
        )
    }

    render() {

        const {
            bgColor2,
            mainColor,
            mainColorText,
            largePagePadding,
            smallBorderRadius,
            onRefresh,
            triggerRefresh,
            textColor2,
            Id,
            Name,
            Description,
            Phone,
            Address,
            fetchContent,
            latitude,
            longitude,
            AllowCustomerToAddProducts,
            store_type
        } = this.props

        return (
            <LazyContainer>
                <CustomHeader
                    navigation={this.props.navigation}
                    title={"Profile"}
                    leftComponent="back" />

                <ScrollView
                    refreshControl={
                        <CustomRefreshControl
                            refreshing={triggerRefresh}
                            onRefresh={onRefresh}
                        />
                    }
                    contentContainerStyle={{
                    }}>
                    {this.renderHeader()}

                    <SettingsTitle title={'Info'} containerStyle={{ paddingVertical: 0 }} />

                    <ArrowItem
                        onPress={() => {
                            //AddSubStore
                            this.props.navigation.navigate('AddSubStore', {
                                Id,
                                Name,
                                Description,
                                Phone,
                                Address,
                                fetchContent
                            })
                        }}
                        title={'UpdateProfile'}
                        Icon={() => <SimpleLineIcons
                            style={{ marginRight: 20 }}
                            name={"user"}
                            size={20}
                            color={textColor2} />
                        }
                        style={{
                            paddingHorizontal: 20,
                        }}
                    />


                    <SettingsSeparator />

                    <ArrowItem
                        style={{
                            paddingHorizontal: 20,
                        }}
                        Icon={() => <SimpleLineIcons
                            style={{ marginRight: 20 }}
                            name={"location-pin"}
                            size={20}
                            color={textColor2} />
                        }
                        onPress={() => {
                            this.props.navigation.navigate('SubStoreMap', { latitude, longitude, fetchContent })
                        }}
                        title={'UpdateLocation'}
                    />

                    <SettingsSeparator />

                    <View style={{ marginBottom: 10 }} />

                    <SettingsTitle title={'More'} containerStyle={{ paddingVertical: 0 }} />

                    {store_type === 3 && AllowCustomerToAddProducts.Value && <View>
                        <ArrowItem
                            style={{
                                paddingHorizontal: 20,
                            }}
                            Icon={() => <SimpleLineIcons
                                style={{ marginRight: 20 }}
                                name={"bag"}
                                size={20}
                                color={textColor2} />
                            }
                            onPress={() => { this.props.navigation.navigate('MyProducts_Alt') }}
                            title={'MyProducts'}
                        />
                        <SettingsSeparator />
                    </View>}

                    {store_type === 3 && AllowCustomerToAddProducts.Value && <View>
                        <ArrowItem
                            style={{
                                paddingHorizontal: 20,
                            }}
                            Icon={() => <SimpleLineIcons
                                style={{ marginRight: 20 }}
                                name={"wallet"}
                                size={20}
                                color={textColor2} />
                            }
                            onPress={() => { this.props.navigation.navigate('MySales') }}
                            title={'MySales'}
                        /></View>}

                </ScrollView>

            </LazyContainer>
        )
    }
}

export default SubStoreProfile