import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import LazyContainer from '../../../partial_components/Common/LazyContainer'
import ItemSeparator from '../../../partial_components/Common/ItemSeparator';
import { shadowStyle2, } from '../../../constants/Style';
import { screenWidth } from '../../../constants/Metrics';
import SettingsTitle from '../../../partial_components/Common/Settings/SettingsTitle';
import { withLocalize } from 'react-localize-redux';
import { formatDate } from '../../../utils/Date.js';
import HorizontalInput from '../../../partial_components/Common/HorizontalInput';
import RoundedInput from '../../../partial_components/Theme26/RoundedInput';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { FixHtmlTextColor } from '../../../utils/Html';
import CustomWebView from '../../../partial_components/Common/CustomWebView';

class OrderDetails extends Component {
    constructor(props) {
        super(props)

        this.orderId = this.props.route.params?.Id

        this.state = {
            didFetchData: false,
            isDateTimePickerVisible: false,
            customerModalShown: false,
        }
    }
    componentDidMount() {
        this.setState({ ...this.props, didFetchData: true })
    }

    renderHeader = () => {
        const { summary, didFetchData } = this.state

        if (!didFetchData) {
            return null
        }

        const {
            bgColor2,
        } = this.props

        return (
            <View
                style={{
                    backgroundColor: bgColor2,
                    borderRadius: 25,
                    paddingVertical: 20,
                    marginHorizontal: 20,
                    marginBottom: 20,
                    alignItems: 'center',
                    ...shadowStyle2,
                }}>
                <CustomWebView
                    style={{
                        width: screenWidth - (20 * 4),
                    }}
                    source={summary}
                />
            </View>
        )
    }

    renderContent = () => {
        if (this.state.didFetchData) {
            const { largePagePadding } = this.props

            const {
                Courier,
                Status,
                CreatedUtc,
                DeliverDate,
                Name,
                OrderCode,
            } = this.state

            return (
                <View style={{ paddingTop: largePagePadding, paddingHorizontal: largePagePadding }} >
                    <RoundedInput
                        editable={false}
                        title="Name"
                        value={Name}
                    />

                    <RoundedInput
                        editable={false}
                        title="OrderCode"
                        value={OrderCode}
                        editable={false} />

                    <RoundedInput
                        editable={false}
                        title="Courier"
                        value={Courier ? Courier.Name : null}
                        editable={false} />

                    <RoundedInput
                        editable={false}
                        title="Status"
                        value={Status ? Status.Name : null}
                        editable={false} />

                    <RoundedInput
                        editable={false}
                        title="CreatedDate"
                        value={CreatedUtc ? formatDate(CreatedUtc) : null}
                        editable={false} />

                    <RoundedInput
                        editable={false}
                        title="DeliverDate"
                        value={DeliverDate ? formatDate(DeliverDate) : null}
                        editable={false} />


                </View>
            )
        }
    }


    render() {
        return (
            <LazyContainer>
                <CustomHeader
                    title={"Details"}
                    navigation={this.props.navigation}
                    leftComponent={'back'}
                />
                <ScrollView>

                    {this.renderContent()}

                    <View style={{ marginVertical: 10 }}>
                        <SettingsTitle title={"Summary"} textStyle={{ fontWeight: 'bold' }} />
                    </View>
                    {this.renderHeader()}

                </ScrollView>

            </LazyContainer>
        )
    }
}

export default withLocalize(OrderDetails)