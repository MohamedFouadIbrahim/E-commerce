import React from 'react';
import { Image, View } from 'react-native';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import FontedText from '../../../partial_components/Common/FontedText';

class SecondarySplash extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            Counter: this.props.SkipInSecondSplashAfter.Value
        }
    }

    unDisableSkipButtonCounter = () => {
        this.setState({ Counter: this.state.Counter - 1 })

        if (this.state.Counter >= 1)
            this.timeToUnDisableSkipButton = setTimeout(this.unDisableSkipButtonCounter, 1000)
    }

    componentDidMount() {
        const {
            SkipInSecondSplashAfter
        } = this.props

        this.timeToUnDisableSkipButton = setTimeout(this.unDisableSkipButtonCounter, 1000)
    }

    render() {
        const {
            pagePadding,
            bgColor2,
            largePagePadding,
            onSkipPress,
            disableSkipButton
        } = this.props

        return (
            <LazyContainer style={{ flex: 1, alignItems: 'center' }} >

                <CustomTouchable disabled={disableSkipButton} onPress={onSkipPress} style={{ position: 'absolute', right: pagePadding, top: largePagePadding, zIndex: 1, backgroundColor: bgColor2, borderRadius: pagePadding }} >
                    <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingHorizontal: pagePadding }} >
                        <TranslatedText text='Skip' style={{ paddingRight: (this.state.Counter > 0 ? pagePadding : 0), paddingVertical: pagePadding }} />
                        {this.state.Counter > 0 && <FontedText>
                            {`(${this.state.Counter})`}
                        </FontedText>}
                    </View>
                </CustomTouchable>

                <Image
                    style={{ width: '100%', height: '100%' }}
                    source={require('../../../assets/images/Gif/SecondarySplash.gif')}
                />

            </LazyContainer>
        )
    }
}

export default SecondarySplash