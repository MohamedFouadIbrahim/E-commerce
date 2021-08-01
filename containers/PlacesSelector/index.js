import React from 'react'
import { connect } from 'react-redux'

const PlacesSelector = (props) => {
	let PresentationalComponent = require('../../presentational_components/Common/PlacesSelector').default

	return (
		<PresentationalComponent 
			{...props} />
	)
}

const mapStateToProps = ({
	places: {
		countries,
	},
}) => ({
	countries,
})

export default connect(mapStateToProps)(PlacesSelector)