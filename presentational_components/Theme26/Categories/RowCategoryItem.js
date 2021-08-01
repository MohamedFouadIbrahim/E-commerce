import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import FontedText from '../../../partial_components/Common/FontedText';
import RemoteImage from '../../../partial_components/Common/RemoteImage';
import { shadowStyle2 } from '../../../constants/Style';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';

class RowCategoryItem extends React.Component {
    render() {
        const {
            item,
            largePagePadding,
            bgColor1,
			smallBorderRadius,
			onPressCategory,
        } = this.props

        const {
            Icon: { ImageUrl },
            Name,
        } = item

        return (
            <CustomTouchable
                onPress={() => {
					onPressCategory(item)
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

export default connect(mapStateToProps)(RowCategoryItem)