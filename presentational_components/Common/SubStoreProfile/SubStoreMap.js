import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import CurrentLocationButton from '../../../partial_components/Common/CurrentLocationButton';
import CustomHeader, { headerHeight } from '../../../partial_components/Common/CustomHeader';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import CustomMarker from '../../../partial_components/Common/CustomMarker';
import { UpdateSubStoreLocation } from '../../../services/SubStoreService';
import { connect } from 'react-redux';
import { GetCurrentPosition } from '../../../utils/Location';
import HeaderSubmitButton from '../../../partial_components/Common/HeaderSubmitButton';
import { LongToast } from '../../../utils/Toast';

class SubStoreMap extends React.Component {

    constructor(props) {
        super(props)

        const {
            latitude,
            longitude
        } = this.props.route.params

        this.state = {
            latitude,
            longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
            dataFetched: false,
            lockSubmit: false
        }

        this.lockSubmit = false
    }

    submit = () => {
        if (this.lockSubmit) {
            return
        }

        
        const {
            latitude,
            longitude
        } = this.state
        
        if (!latitude || !longitude) {
            return LongToast('PlaseSelectYourLocation')
        }

        const {
            fetchContent
        } = this.props.route.params


        this.lockSubmit = true
        this.setState({ lockSubmit: true })

        UpdateSubStoreLocation({
            Lat: latitude,
            Lng: longitude
        }, res => {
            this.lockSubmit = false
            this.setState({ lockSubmit: false })
            this.props.navigation.goBack()
            fetchContent && fetchContent()
        }, err => {
            this.lockSubmit = false
            this.setState({ lockSubmit: false })
        })
    }

    resetUserLocation = () => {

        GetCurrentPosition(({ latitude, longitude }) => {

            this.setState({
                latitude,
                longitude
            })
        })

    }

    renderMyPositionButton = () => {
        const { largePagePadding } = this.props
        return (
            <CurrentLocationButton
                size={35}
                style={{
                    position: 'absolute',
                    right: largePagePadding,
                    top: headerHeight + 15,
                    borderRadius: 30,
                    paddingHorizontal: 2
                }}
                onPress={this.resetUserLocation}
            />
        )
    }

    onRegionChangeComplete = (e) => {

        const {
            latitude,
            latitudeDelta,
            longitude,
            longitudeDelta
        } = e

        this.setState({
            latitude,
            latitudeDelta,
            longitude,
            longitudeDelta
        })

    }

    render() {
        const {
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta,
            lockSubmit
        } = this.state

        const {
            mainColor
        } = this.props

        return (
            <LazyContainer>
                <CustomHeader
                    navigation={this.props.navigation}
                    title={"UpdateLocation"}
                    leftComponent="back"
                    rightComponent={<HeaderSubmitButton onPress={this.submit} isLoading={lockSubmit} />}
                />

                <MapView
                    // ref={getMapRef}
                    style={{
                        marginTop: headerHeight,
                        ...StyleSheet.absoluteFillObject,
                    }}

                    initialRegion={{
                        latitude: latitude ? latitude : 0,
                        longitude: longitude ? longitude : 0,
                        latitudeDelta,
                        longitudeDelta,
                    }}

                    onRegionChangeComplete={(e) => {
                        this.onRegionChangeComplete(e)
                    }}

                    region={latitude && longitude ? {
                        latitude,
                        longitude,
                        latitudeDelta,
                        longitudeDelta,
                    } : undefined}

                    showsUserLocation={false}
                    followsUserLocation={false}>
                </MapView>
                <CustomMarker
                    color={mainColor}
                    style={{
                        position: 'absolute',
                        top: '49%',
                        left: '47%',
                    }}
                    size={40}
                />
                {this.renderMyPositionButton()}

            </LazyContainer>
        )
    }
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
export default connect(mapStateToProps)(SubStoreMap)