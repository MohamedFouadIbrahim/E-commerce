import React from 'react'

export default class EmptyScreen extends React.Component {
    componentDidMount() {
        this.makeAction()        
    }
    componentWillUpdate() {
        this.makeAction()
    }

    makeAction = () => {
        if (route.params?.params) {
            this.props.navigation.navigate('Products', { params: this.props.route.params?.params })
        } else {
            this.props.navigation.openDrawer();
        }
    }
    render() {
        return null
    }
}