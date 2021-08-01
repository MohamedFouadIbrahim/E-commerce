import React from 'react';
import { connect } from 'react-redux';

class SecondarySplash extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            disableSkipButton: true
        }
    }

    onSkipPress = () => {
        const { skipSecondarySplash, ShowVideoOnce, skipSplashScreenLocal } = this.props

        if (ShowVideoOnce.Value == false) {
            skipSplashScreenLocal(true)
            skipSecondarySplash(false)
        } else {
            skipSecondarySplash(true)
        }
    }

    /**
     * ShowVideoOnce: false => Always
        SkipInSecondSplashAfter: button
        SplashScreenVideo : file
     */
    unDisableSkipButton = () => {
        this.setState({ disableSkipButton: false })
    }

    componentDidMount() {

        // SkipInSecondSplashAfter,
        // "SplashVideoLengthSecond"
        // "ShowVideoOnce"
        const {
            SplashVideoLengthSecond,
            SkipInSecondSplashAfter
        } = this.props

        this.timeToLeaveScreen = setTimeout(this.onSkipPress, (SplashVideoLengthSecond.Value * 1000))
        this.timeToUnDisableSkipButton = setTimeout(this.unDisableSkipButton, (SkipInSecondSplashAfter.Value * 1000))
    }

    componentWillUnmount() {
        clearTimeout(this.timeToLeaveScreen)
        clearTimeout(this.timeToUnDisableSkipButton)
    }

    render() {

        let PresentationalComponent = require('../../presentational_components/Common/SecondarySplash').default

        return (
            <PresentationalComponent onSkipPress={this.onSkipPress} {...this.props} disableSkipButton={this.state.disableSkipButton} />
        )
    }

}

const mapStateToProps = ({
    secondarysplash: {
        is_skipped_secondary_splash
    },
    navigation: {
        is_slpashScreenLocalSkiped
    },
    runtime_config: {
        runtime_config: {
            screens: {
                Splash_Screen_01_1,
            },
            colors,
            styles,
        },
    },
}) => ({
    is_skipped_secondary_splash,
    is_slpashScreenLocalSkiped,
    ...Splash_Screen_01_1,
    ...colors,
    ...styles,
})

function mergeProps(stateProps, { dispatch }, ownProps) {
    const {
        actions: {
            skipSecondarySplash
        }
    } = require('../../redux/SecondarySplash');

    const {
        actions: {
            skipSplashScreenLocal
        }
    } = require('../../redux/NavigationRedux')
    return {
        ...ownProps,
        ...stateProps,
        skipSecondarySplash: (is_skipped_secondary_splash) => skipSecondarySplash(dispatch, is_skipped_secondary_splash),
        skipSplashScreenLocal: (is_slpashScreenLocalSkiped) => skipSplashScreenLocal(dispatch, is_slpashScreenLocalSkiped)
    };
}

export default connect(mapStateToProps, undefined, mergeProps)(SecondarySplash) 