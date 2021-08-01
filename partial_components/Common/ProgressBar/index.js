import React from 'react';
import * as Progress from 'react-native-progress';

const ProgressBar = ({ progress, style, mainColor, Width = null, height = 6, borderRadius = 4, isContinuous = false, borderWidth = 1, indeterminateAnimationDuration = 2000 }) => (

    <Progress.Bar
        progress={progress}
        style={style}
        width={Width}
        color={mainColor}

        indeterminate={isContinuous}
        useNativeDriver={true}
        indeterminateAnimationDuration={indeterminateAnimationDuration}
        height={height}
        borderRadius={borderRadius}
        borderWidth={borderWidth}
    />
)

export default ProgressBar