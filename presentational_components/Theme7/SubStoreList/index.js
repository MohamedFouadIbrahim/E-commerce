import React from 'react';
import {  View, FlatList } from 'react-native';
import RemoteDataContainer from '../../../partial_components/Common/RemoteDataContainer'
import LazyContainer from '../../../partial_components/Common/LazyContainer'
import FontedText from '../../../partial_components/Common/FontedText'
import RemoteImageBackground from '../../../partial_components/Common/RemoteImageBackground'
import RemoteImage from '../../../partial_components/Common/RemoteImage'
import ItemSeparator from '../../../partial_components/Common/ItemSeparator'
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import { screenWidth } from '../../../constants/Metrics';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';

class SubStore extends React.Component {

    constructor(props) {

        super(props)

        const { largePagePadding, pagePadding, ShowTextOnImage } = this.props

        this.isGridView = true
        this.imageDim = screenWidth / 2
        this.numColumns = 2
        this.itemSeparatorHeight = 0

        this.state = {
            triggerRefresh: false,
            data: []
        }

        if (ShowTextOnImage.Value) {
            this.textStyle = {
                position: 'absolute',
                left: pagePadding,
                bottom: pagePadding,
            }
        }
        else {
            this.textStyle = {
                marginTop: 5,
                marginBottom: 15,
                marginLeft: pagePadding,
            }
        }

    }


    // renderSubStore = ({ item, index }) => {
    //     const { Id, Name, Image: { ImageUrl, TextColor } } = item

    //     const {
    //         pagePadding,
    //         borderRadius,
    //         ShowTextOnImage,
    //     } = this.props

    //     const halfPagePadding = pagePadding / 2
    //     const { imageDim } = this

    //     return (
    //         <CustomTouchable
    //             onPress={() => { this.props.navigation.navigate('SubStore', { Id }) }}
    //             style={[{
    //                 borderRadius: borderRadius,
    //                 width: imageDim,

    //             },
    //             this.isGridView ? (index % 2 === 0 ? { marginRight: halfPagePadding } : { marginLeft: halfPagePadding }) : {}
    //             ]}>
    //             <RemoteImageBackground
    //                 borderRadius={borderRadius}
    //                 dimension={720}
    //                 style={{
    //                     borderRadius: borderRadius,
    //                     width: imageDim,
    //                     height: imageDim,
    //                     padding: pagePadding,
    //                     justifyContent: 'flex-end',
    //                 }}
    //                 uri={ImageUrl}>
    //                 {ShowTextOnImage.Value && <FontedText style={{ color: TextColor, fontSize: 19, textAlign: 'center', fontWeight: 'bold', }}>{Name}</FontedText>}
    //             </RemoteImageBackground>

    //             {!ShowTextOnImage.Value && <FontedText style={{ fontSize: 17, textAlign: 'center' }}>{Name}</FontedText>}
    //         </CustomTouchable>
    //     )
    // }

    renderSubStore = ({ item }) => {
        const { Id, Name, Image: { ImageUrl, TextColor } } = item

        const {
            pagePadding,
            borderRadius,
            ShowTextOnImage,
        } = this.props
        const { imageDim, textStyle } = this
        const {
            textColor1,
        } = this.props

        return (
            <CustomTouchable
                onPress={() => { this.props.navigation.navigate('SubStore', { Id }) }}
                style={{
                    alignItems: 'center',
                    width: imageDim,
                }}>
                <RemoteImage
                    dimension={720}
                    resizeMode='cover'
                    style={{ width: imageDim, height: 230 }}
                    uri={ImageUrl}
                />

                <FontedText
                    style={[textStyle, {
                        color: ShowTextOnImage.Value ? TextColor : textColor1,
                        fontSize: 18,
                        textAlign: 'left',
                    }]}>{Name}</FontedText>
            </CustomTouchable>
        )
    }
    render() {
		const {
			mainScreen,
		} = this.props

        return (
            <LazyContainer style={{ flex: 1 }} >
                <CustomHeader
					mainScreen={mainScreen}
					title='SubStores'
                    navigation={this.props.navigation}
                    leftComponent='drawer'
                />

                <RemoteDataContainer
                    contentContainerStyle={{
                        paddingHorizontal: this.props.largePagePadding
                    }}
                    pagination={false}
                    url={'SubStore/List'}
                    onDataFetched={(data) => {
                        this.setState({ data })
                    }}
                    updatedData={this.state.data}
                    keyExtractor={({ Id }) => `${Id}`}
                    ItemSeparatorComponent={() => { return <ItemSeparator /> }}
                    renderItem={this.renderSubStore}
                    numColumns={this.numColumns}
                    triggerRefresh={this.state.triggerRefresh}
                />

            </LazyContainer>
        )
    }
}
export default SubStore