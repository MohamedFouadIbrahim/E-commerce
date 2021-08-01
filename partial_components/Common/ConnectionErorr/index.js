import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import CustomButton from '../../Common/CustomButton';
import FontedText from '../../Common/FontedText';
import { connect } from 'react-redux';

const ConnectionErorr = (props) => {

    const {
        loading,
        onPress,
        bgColor1,
        largePagePadding,
        textColor1
    } = props

    const [showModal, setShowModal] = useState(true)

    return (
        <Modal isVisible={showModal} {...props} style={{ backgroundColor: bgColor1, margin: 0, paddingHorizontal: largePagePadding, justifyContent: 'center' }}  >


            <Image source={require('../../../assets/images/offline/ConnenctionErorr.png')}
                style={{
                    width: 200,
                    height: 200,
                    alignSelf: 'center',
                }}
            />

            <View
                style={{
                    alignSelf: 'center',
                    marginVertical: largePagePadding
                }}>

                <Text style={{ color: textColor1, fontWeight: 'bold', fontSize: 15, marginBottom: 10, alignSelf: 'center' }}>
                    Oh no!!!
                </Text>

                <FontedText
                    style={{
                        fontSize: 15
                    }}
                >
                    No Internet found, Check you connection or try again.
                </FontedText>
            </View>

            <CustomButton
                onPress={() => onPress && onPress()}
                title='tryAgain'
                autoTranslate={false}
                loading={loading}
            />

        </Modal>
    )
}

const mapStateToProps = ({
    runtime_config: {
        runtime_config: {
            colors,
            styles,
        },
    },
}) => ({
    ...colors,
    ...styles,
})

export default connect(mapStateToProps)(ConnectionErorr)