import React from 'react'
import { connect } from 'react-redux'
import CustomTouchable from '../CustomTouchable'
import Ionicons from 'react-native-vector-icons/Ionicons';

class CurrentLocationButton extends React.Component {
    render() {
        const { size, iconColor, name, textColor1, bgColor2, style, ...resProp } = this.props
        return (
            <CustomTouchable
                {...resProp}
                style={[{ backgroundColor: bgColor2 }, style]}
            >
                <Ionicons name={name || 'md-locate'} size={size || 35} color={iconColor || 'black'} />

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
export default connect(mapStateToProps)(CurrentLocationButton)