import React, { Component } from 'react';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import { View, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import QRCode from 'react-native-qrcode-svg';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import FontedText from '../../../partial_components/Common/FontedText';
import CircularImage from '../../../partial_components/Common/CircularImage';

export default class MyCode extends Component {
    constructor() {
        super()
        this.state = {
            amount: null,
            screenWidth: Dimensions.get('window').width,
        }
    }

    componentDidMount() {
        //re render when change orientation
        console.log('componentDidMount')
        Dimensions.addEventListener('change', () => {
            console.log('change')
            this.setState({
                screenWidth: Dimensions.get('window').width,
            })
        })
    }
    render() {
        const {
            pagePadding,
            largePagePadding,
            bgColor1,
            bgColor2,
            textColor2,
            data,
            user_data,
        } = this.props

        const { screenWidth } = this.state
        this.codeComponentWidth = screenWidth * 0.55

        return (
            <LazyContainer backgroundColor={bgColor2}  >
                <CustomHeader
                    navigation={this.props.navigation}
                    title={"MyCode"}
                    leftComponent={"back"} />

                <ScrollView
                    contentContainerStyle={{
                        margin: pagePadding,
                        flexGrow: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <View style={{
                        backgroundColor: 'white',
                        padding: 30,
                        paddingTop: 40,
                        margin: largePagePadding,
                        marginTop: 40,
                        alignItems: 'center',
                        borderRadius: 5,

                    }}>
                        <CircularImage
                            size={60}
                            style={{
                                position: 'absolute',
                                top: -30,
                                zIndex: 1,
                                borderColor: bgColor1,
                                borderWidth: 4,
                                backgroundColor: bgColor1,
                            }}
                            uri={user_data.Image.ImageUrl}
                            id={user_data.Image.Id} />
                        {user_data.FullName != null && user_data.FullName != "" ? <FontedText style={{ fontSize: 20, fontWeight: 'bold' }}>{user_data.FullName}</FontedText> : null}
                        {user_data.LoginAccount != null && user_data.LoginAccount != "" ? <FontedText style={{ color: textColor2, marginBottom: largePagePadding }}>{user_data.LoginAccount}</FontedText> : null}
                        <QRCode
                            size={this.codeComponentWidth}
                            value={data} />
                    </View>
                    <TranslatedText style={{ color: textColor2, marginBottom: 20 }} text={'AskClerk'}></TranslatedText>
                </ScrollView>
            </LazyContainer>
        )
    }
}