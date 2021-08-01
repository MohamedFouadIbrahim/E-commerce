import React from 'react';
import { View } from 'react-native';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import CloseButton from '../../../partial_components/Theme26/CloseButton';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import CustomHeader from '../../../partial_components/Common/CustomHeader';

class Temrs extends React.Component {

    render() {
        const { pagePadding, largePagePadding } = this.props
        return (
            <LazyContainer >
                <CustomHeader
                    title={"Terms"}
                    navigation={this.props.navigation}
                    leftComponent="back" />

                <View style={{ flex: 1, paddingHorizontal: largePagePadding, paddingVertical: largePagePadding }}>
                    <TranslatedText text={'TermsText'} />
                </View>

            </LazyContainer>
        )

    }
}
export default Temrs