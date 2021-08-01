import React from 'react';
import { RefreshControl } from 'react-native';
import { connect } from 'react-redux';

class CustomRefreshControl extends React.PureComponent {
    render() {
        const { 
			mainColor, 
			bgColor1,
			...restProps
		} = this.props

        return (
            <RefreshControl
                colors={[mainColor]}
                tintColor={mainColor}
                progressBackgroundColor={bgColor1}
                {...restProps}
            />
        )
    }
}

const mapStateToProps = ({
    runtime_config: {
        runtime_config: {
            colors: {
				mainColor,
				bgColor1,
			},
        }
    },
}) => ({
	mainColor,
	bgColor1,
})

export default connect(mapStateToProps)(CustomRefreshControl)