import React from 'react'
import { ScrollView, Image } from 'react-native'
import CircularImage from '../CircularImage';
import CustomLoader from '../CustomLoader';
import Ionicons from 'react-native-vector-icons/Ionicons';

class MultiImageUplaoder extends React.PureComponent {

    constructor(props) {
        super(props)

    }

    render() {

        const { Images, onPress, onLongPress, refrence, IsLoading, prossesEvent, ...resProps } = this.props
        
        return (
            <ScrollView horizontal contentContainerStyle={{ justifyContent: 'center', flexGrow: 1 }} ref={refrence} {...resProps} >

                {Images.map((item, index) => (
                    <CircularImageWithLoader
                        key={index}
                        IsLoading={IsLoading}
                        prossesEvent={prossesEvent}
                        onPressItem={(id) => { onPress && onPress(id, true) }}
                        picker_image_uri={item.picker_image_uri}
                        index={index}
                        onLongPressItem={(id) => { onLongPress && onLongPress(id) }}
                    />
                ))}


                <CircularImageWithLoader
                    IsLoading={false}
                    prossesEvent={0}
                    onPressItem={() => { onPress && onPress(this.props.Images.length, false) }}
                    picker_image_uri={null}
                />

            </ScrollView>
        )
    }
}

class CircularImageWithLoader extends React.Component {

    render() {

        const { IsLoading, prossesEvent, onPressItem, picker_image_uri, index, onLongPressItem, ...resProps } = this.props
        const imageSize = 90
        return (
            <CustomTouchable
                {...resProps}
                onLongPress={() => { onLongPressItem && onLongPressItem(index) }}
                onPress={() => { onPressItem && onPressItem(index) }}
                style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#aaaaaa',
                    margin: 20,
                    width: imageSize,
                    height: imageSize,
                    borderRadius: imageSize / 2,
                }}>
                {picker_image_uri ?    <Image
                        source={{ uri: picker_image_uri }}
                        style={{
                            width: imageSize,
                            height: imageSize,
                            borderRadius: imageSize / 2,
                        }}
                    />: <Ionicons
                        name={`ios-add`}
                        size={45}
                        color={'white'} />}
                {IsLoading == true ?
                    <CustomLoader
                        size={imageSize - 30}
                        progress={prossesEvent == 0 ? prossesEvent : prossesEvent}
                    />
                    : null
                }
            </CustomTouchable>
        )
    }
}

export default MultiImageUplaoder