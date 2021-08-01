import React from 'react';
import { connect } from 'react-redux'
import * as Progress from 'react-native-progress';

const CustomLoader = (props) => {
    const {
        size,
        progress,
        style,
        mainColor,
        mainColorText,
        otherProps
    } = props

    return (
        // null
        <Progress.Circle
            size={size || 60}
            style={[{ position: 'absolute', backgroundColor: mainColorText, borderRadius: 60 }, style]}
            progress={progress}
            animated
            showsText={true}
            strokeCap='round'
            color={mainColor}
            {...otherProps}
        />
    )
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

export default connect(mapStateToProps)(CustomLoader)