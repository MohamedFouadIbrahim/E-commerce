import React from 'react';
import { View, TextInput, I18nManager } from 'react-native';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import FontedText from '../../../partial_components/Common/FontedText';
import ItemSeparator from '../../../partial_components/Common/ItemSeparator';
import RemoteDataContainer from '../../../partial_components/Common/RemoteDataContainer';
import StarRating from 'react-native-star-rating';
import HeaderSubmitButton from '../../../partial_components/Common/HeaderSubmitButton';
import { LongToast } from '../../../utils/Toast';
import { STRING_LENGTH_LONG } from '../../../constants/Config';

class AddProductReview extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: null,
            number: 0
        }

        this.orderId = this.props.route.params?.Id
    }

    renderItem = ({ item, index }) => {
        const { Product, OrderLineId } = item
        const { Id: ProductId, Name, Icon: { ImageUrl } } = Product
        const {
            bgColor2,
            textColor1
        } = this.props

        if (!this.state.data) {
            return null
        }
        return (
            <View
                style={{
                    marginHorizontal: this.props.pagePadding,
                    flex: 1,
                    marginVertical: this.props.pagePadding
                }}>

                <FontedText style={{ fontSize: 18, alignSelf: 'center' }}>{Name}</FontedText>

                <View style={{ marginVertical: this.props.pagePadding, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }} >

                    <TextInput
                        placeholderTextColor={textColor1}
                        maxLength={STRING_LENGTH_LONG}
                        multiline
                        style={{ flex: 5, backgroundColor: bgColor2, color: textColor1, marginHorizontal: 5, borderRadius: 10 }}
                        placeholder='ReviewText'
                        value={this.state.data[index].Review}
                        onChangeText={(Text) => {

                            const NewData = this.state.data.map(things => {
                                if (things.OrderLineId == OrderLineId) {
                                    return { ...things, Review: Text }
                                } else {
                                    return { ...things }
                                }
                            })

                            this.setState({ data: NewData })

                        }}
                    />

                    <StarRating
                        containerStyle={{ flex: 3 }}
                        selectedStar={(number) => {

                            const NewData = this.state.data.map(things => {
                                if (things.OrderLineId == OrderLineId) {
                                    return { ...things, Rating: number }
                                } else {
                                    return { ...things }
                                }

                            })

                            this.setState({ data: NewData })
                        }}
                        maxStars={5}
                        emptyStarColor={bgColor2}
                        fullStarColor={'#ebcc1c'}
                        rating={this.state.data[index].Rating}
                        starStyle={I18nManager.isRTL ? { transform: [{ scaleX: -1 }] } : {}}
                        starSize={18}
                    />

                    <HeaderSubmitButton
                        isLoading={this.state.data[index].isLoading || false}
                        onPress={() => {

                            if (!this.state.data[index].Review) {
                                return LongToast('CantHaveEmptyInputs')
                            }

                            const NewData = this.state.data.map(things => {
                                if (things.OrderLineId == OrderLineId) {
                                    return { ...things, isLoading: true }
                                } else {
                                    return { ...things, isLoading: false }
                                }

                            })

                            this.setState({ data: NewData })

                            this.props.submit({
                                Id: this.state.data[index].OrderLineId,
                                Review: this.state.data[index].Review,
                                Rating: this.state.data[index].Rating
                            }, res => {
                                const NewData = this.state.data.map(things => {
                                    if (things.OrderLineId == OrderLineId) {
                                        return { ...things, isLoading: false }
                                    } else {
                                        return { ...things, isLoading: false }
                                    }

                                })

                                this.setState({ data: NewData })

                                LongToast('DataSaved')
                            }, err => {
                                const NewData = this.state.data.map(things => {
                                    if (things.OrderLineId == OrderLineId) {
                                        return { ...things, isLoading: false }
                                    } else {
                                        return { ...things, isLoading: false }
                                    }

                                })

                                this.setState({ data: NewData })
                            })

                        }}
                    />
                </View>

            </View>
        )
    }

    render() {
        return (
            <LazyContainer style={{ flex: 1 }} >
                <CustomHeader
                    title={"Review"}
                    navigation={this.props.navigation}
                    leftComponent='back' />

                <RemoteDataContainer
                    url={"Order/Items"}
                    params={`orderId=${this.orderId}`}
                    pagination={false}
                    onDataFetched={(data) => {
                        this.setState({ data })
                    }}
                    updatedData={this.state.data}
                    triggerRefresh={this.state.triggerRefresh}
                    keyExtractor={({ OrderLineId }) => `${OrderLineId}`}
                    ItemSeparatorComponent={() => <ItemSeparator />}
                    renderItem={this.renderItem} />
            </LazyContainer>
        )

    }
}

export default AddProductReview