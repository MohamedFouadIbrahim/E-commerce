import React from 'react';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import { View } from 'react-native';

class Temrs extends React.Component {
    render() {
        return (
            <LazyContainer>
                <CustomHeader
                    navigation={this.props.navigation}
                    title={'Terms'}
                />

                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <TranslatedText text={'TermsText'} />
                </View>

            </LazyContainer>
        )
    }
}
export default Temrs