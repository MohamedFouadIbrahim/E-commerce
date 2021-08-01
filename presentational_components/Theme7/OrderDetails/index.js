import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import LazyContainer from '../../../partial_components/Common/LazyContainer'
import ItemSeparator from '../../../partial_components/Common/ItemSeparator';
import { withLocalize } from 'react-localize-redux';
import { formatDate } from '../../../utils/Date.js';
import HorizontalInput from '../../../partial_components/Common/HorizontalInput';

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

    renderContent = () => {
        if (this.state.didFetchData) {
            const { translate } = this.props

            const {
                Courier,
                Status,
                CreatedUtc,
                DeliverDate,
                Name,
                OrderCode,
            } = this.state

            return (
                <ScrollView
                    contentContainerStyle={{
                    }}>
                    <HorizontalInput
                        editable={false}
                        label="Name"
                        value={Name}
                    />

                    <ItemSeparator />

                    <HorizontalInput
                        editable={false}
                        label="OrderCode"
                        value={OrderCode}
                        editable={false} />

                    <ItemSeparator />

                    <HorizontalInput
                        editable={false}
                        label="Courier"
                        value={Courier ? Courier.Name : null}
                        editable={false} />

                    <ItemSeparator />

                    <HorizontalInput
                        editable={false}
                        label="Status"
                        value={Status ? Status.Name : null}
                        editable={false} />

                    <ItemSeparator />

                    <HorizontalInput
                        editable={false}
                        label="CreatedDate"
                        value={CreatedUtc ? formatDate(CreatedUtc) : null}
                        editable={false} />

                    <ItemSeparator />

                    <HorizontalInput
                        editable={false}
                        label="DeliverDate"
                        value={DeliverDate ? formatDate(DeliverDate) : null}
                        editable={false} />

                </ScrollView>
            )
        }
    }


    render() {
        return (
            <LazyContainer>
                <CustomHeader
                    navigation={this.props.navigation}
                    title={"Details"}
                    leftComponent={'back'}
                />

                {this.renderContent()}

            </LazyContainer>
        )
    }
}

export default withLocalize(OrderDetails)