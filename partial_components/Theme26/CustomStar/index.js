import React from 'react'
import { I18nManager } from 'react-native'
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux';

const CustomStar = (props) => {
	const { rating, disabled, bgColor2 } = props;

	return (
		<StarRating
			disabled={disabled || true}
			maxStars={5}
			emptyStarColor={bgColor2}
			fullStarColor={'#ebcc1c'}
			rating={rating}
			starStyle={I18nManager.isRTL ? { transform: [{ scaleX: -1 }] } : {}}
			starSize={18}
			{...props}
		/>
	)
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			colors: {
				bgColor2,
			},
		},
	},
}) => ({
	bgColor2,
})


export default connect(mapStateToProps)(CustomStar)