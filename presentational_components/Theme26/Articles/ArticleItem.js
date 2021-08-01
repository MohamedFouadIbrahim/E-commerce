import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import FontedText from '../../../partial_components/Common/FontedText';
import RemoteImage from '../../../partial_components/Common/RemoteImage';
import { shadowStyle2 } from '../../../constants/Style';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';

class ArticleItem extends React.Component {
    render() {
        const {
            item,
            textColor2,
            navigation,
            largePagePadding,
            bgColor1,
            smallBorderRadius,
        } = this.props

        const {
            Id,
            Icon: { ImageUrl },
            Name,
            ShortDescription,
        } = item

        return (
            <CustomTouchable
                onPress={() => {
                    navigation.navigate('Article', { Id })
                }}
                style={{
                    flexDirection: 'row',
                }}>
                <View
                    style={{
						width: 110,
						height: 110,
                        backgroundColor: bgColor1,
                        borderRadius: smallBorderRadius,
                        ...shadowStyle2
                    }}>       
                    <RemoteImage
						dimension={250}
						style={{
							width: 110,
							height: 110,
                            borderRadius: smallBorderRadius
                        }}
                        uri={ImageUrl}
                    />
                </View>

                <View
                    style={{
						flex: 1,
						paddingLeft: largePagePadding,
                        justifyContent: 'center',
                    }}>
                    <FontedText style={{ fontSize: 15, textAlign: 'left' }}>{Name}</FontedText>
                    <FontedText style={{ color: textColor2, fontSize: 15, textAlign: 'left' }}>{ShortDescription}</FontedText>
                </View>
            </CustomTouchable>
        )
    }
}

const mapStateToProps = ({
    runtime_config: {
        runtime_config: {
            styles,
            colors,
        },
    },
}) => ({
    ...styles,
    ...colors,
})

export default connect(mapStateToProps)(ArticleItem)