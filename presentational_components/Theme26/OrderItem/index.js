import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import LazyContainer from '../../../partial_components/Common/LazyContainer'
import ItemSeparator from '../../../partial_components/Common/ItemSeparator';
import HorizontalInput from '../../../partial_components/Common/HorizontalInput';

export default class OrderItem extends Component {
    constructor(props) {
        super(props)
        this.orderItemId = this.props.route.params?.Id

        this.state = {
            lockSubmit: false,
            didFetchData: false,
            updateOrderPrice: true,
        }
    }

    componentDidMount() {
        this.setState({ ...this.props, didFetchData: true })
    }

    renderContent = () => {
        const { pagePadding } = this.props
        if (this.state.didFetchData) {
            const { Qty, Product, ExtraDetails1, ExtraDetails2 } = this.state
            return (
                <ScrollView
                    contentContainerStyle={{
                    }}>

                    {/* <HorizontalInput
                        label="Name"
                        // keyboardType="number-pad"
                        value={Name ? Name : null}
                        onChangeText={(text) => { this.setState({ Qty: text }) }} /> */}

                    <ItemSeparator />

                    <HorizontalInput
                        editable={false}
                        label="Quantity"
                        keyboardType="number-pad"
                        value={Qty ? String(Qty) : null}
                        onChangeText={(text) => { this.setState({ Qty: text }) }} />

                    <ItemSeparator />

                    <HorizontalInput
                        editable={false}
                        label="ExtraDetails1"
                        value={ExtraDetails1}
                        onChangeText={(text) => { this.setState({ ExtraDetails1: text }) }} />

                    <ItemSeparator />

                    <HorizontalInput
                        editable={false}
                        label="ExtraDetails2"
                        value={ExtraDetails2}
                        onChangeText={(text) => { this.setState({ ExtraDetails2: text }) }} />
                </ScrollView>
            )
        }
    }

    render() {
        return (
            <LazyContainer style={{ flex: 1 }}>
				<CustomHeader 
					title={"Item"}
					navigation={this.props.navigation} 
                    leftComponent='back'                
                />

                {this.renderContent()}
            </LazyContainer>
        )
    }
}

//  withLocalize(OrderItem)