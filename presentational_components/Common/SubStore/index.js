import React from 'react';
import { View, ScrollView } from 'react-native';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import CustomHeader, { secondHeaderIconSize } from '../../../partial_components/Common/CustomHeader';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import CircularImage from '../../../partial_components/Common/CircularImage';
import RemoteImageBackground from '../../../partial_components/Common/RemoteImageBackground';
import SettingsTitle from '../../../partial_components/Common/Settings/SettingsTitle';
import LinearGradient from 'react-native-linear-gradient';
import FontedText from '../../../partial_components/Common/FontedText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { redColor } from '../../../constants/Theme26/Colors';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TouchableIcon from '../../../partial_components/Common/TouchableIcon';
class SubStore extends React.Component {

    renderImage = () => {
        const {
            Image: {
                ImageUrl,
            }
        } = this.props

        const imageSize = 110

        return (
            <View
                style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 25,
                }}>
                <CircularImage
                    uri={ImageUrl}
                    size={imageSize} />
            </View>
        )
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

    onChildChange = () => {
        this.setState({ triggerRefresh: !this.state.triggerRefresh })
    }

    renderHeader = () => {
        const {
            Id,
            Name,
            Description,
            Image: {
                ImageUrl,
            },
            IsLike,
            ProductsCount,
            Likes,
            Create
        } = this.props

        const {
            mainColorText,
            onLikePress,
            largePagePadding,
            mainColor,
            textColor1,
            bgColor2,
            pagePadding,
            onSharePress
        } = this.props

        return (
            <RemoteImageBackground
                dimension={720}
                wide={true}
                blurRadius={5}
                style={{ flex: 1, }}
                uri={ImageUrl}>
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
                            width: 35,
                            alignSelf: 'flex-end',
                            height: 35,
                            borderRadius: 17.5,
                            marginHorizontal: largePagePadding
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

                        <View style={{ alignItems: "center", flexDirection: "row", flexWrap: 'wrap' }} >

                            {/* name and like button */}
                            <View style={{
                                flexDirection: "row",
                                justifyContent: 'center',
                                marginTop: 5,
                                width: '100%',
                            }}>
                                <FontedText style={{ color: mainColorText, textAlign: 'center' }}>{Name}</FontedText>
                                <CustomTouchable
                                    style={{ paddingHorizontal: 10 }}
                                    onPress={() => {
                                        onLikePress(Id, IsLike)
                                    }}>
                                    <AntDesign
                                        name={IsLike ? 'heart' : 'hearto'}
                                        color={redColor}
                                        size={15}
                                    />
                                </CustomTouchable>
                            </View>

                            {/* description */}
                            {Description ?
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: 'center',
                                        marginTop: 5,
                                        width: '100%',
                                    }}>
                                    <FontedText style={{ color: mainColorText, textAlign: 'center' }}>{Description}</FontedText>
                                </View>
                                : null}

                            {/* more info */}
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, width: '100%', }} >
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 5 }} >
                                    <FontedText style={{ color: mainColorText }}>
                                        {Likes}
                                    </FontedText>
                                    <Entypo
                                        name='heart'
                                        color={redColor}
                                        size={18}
                                        style={{ marginHorizontal: 5 }}
                                    />
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 5 }} >
                                    <FontedText style={{ color: mainColorText }} >
                                        {ProductsCount}
                                    </FontedText>

                                    <SimpleLineIcons
                                        name='bag'
                                        color={mainColor}
                                        size={18}
                                        style={{ marginHorizontal: 5 }}
                                    />
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                    <TranslatedText text={'Since'} style={{ marginHorizontal: 5, color: mainColorText }} />
                                    <FontedText style={{ color: mainColorText }} >
                                        {/* {formatDate(Create)} */}
                                        {new Date(Create).getFullYear()}
                                    </FontedText>

                                </View>

                            </View>


                        </View>

                    </View>

                </LinearGradient>
            </RemoteImageBackground>
        )
    }

    rendeProducts = ({ item, index }) => {
        const { Name } = item

        return (
            <FontedText style={{ paddingVertical: this.props.largePagePadding, paddingHorizontal: 20 }}>{Name}</FontedText>
        )
    }

    render() {
        const {
            store_theme_id,
            largePagePadding,
            item,
            textColor1
        } = this.props

        let GridProductsList

        switch (store_theme_id) {
            case 7:
                GridProductsList = require('../../../partial_components/Theme7/GridProductsList').default
                break;
            case 26:
                GridProductsList = require('../../../partial_components/Theme26/GridProductsList').default
                break;
        }

        return (
            <LazyContainer >
                <CustomHeader
                    title='SubStore'
                    navigation={this.props.navigation}
                    rightComponent={
                        <TouchableIcon
                            onPress={() => {
                                this.props.navigation.push('Search', {
                                    screen: 'Search',
                                    params: {
                                        SubStore: item,
                                    },
                                })
                            }}>
                            <Ionicons name="ios-search" color={textColor1} size={secondHeaderIconSize} />
                        </TouchableIcon>
                    }
                />

                <ScrollView>
                    {this.renderHeader()}

                    <SettingsTitle title={"Products"} />

                    <GridProductsList
                        url={"Products"}
                        params={`subStoreId=${this.props.Id}`}
                        contentContainerStyle={{
                        }}
                        navigation={this.props.navigation} />
                </ScrollView>

            </LazyContainer>
        )
    }
}

export default SubStore