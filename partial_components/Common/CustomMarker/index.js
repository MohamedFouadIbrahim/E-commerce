import React from 'react'
import { connect } from 'react-redux'
import CustomTouchable from '../CustomTouchable'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class CustomMapMarker extends React.Component {
    render() {
        const { size, iconColor, name, textColor1, bgColor2, color, ...resProp } = this.props
        return (
            <CustomTouchable
                {...resProp}
            >
                <FontAwesome name={'map-marker'} size={size || 35} color={color || 'black'} />
            </CustomTouchable>
        )
    }
}
const mapStateToProps = ({
    runtime_config: {
        runtime_config: {
            colors,
        },
    },
}) => ({
    ...colors,
})
export default connect(mapStateToProps)(CustomMapMarker)