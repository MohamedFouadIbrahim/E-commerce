import React from 'react';
import { ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import Container from '../Container';
import TranslatedText from '../TranslatedText';

const ScreenLoadingIndicator = ({ 
	mainColor,
	message,
	largePagePadding,
}) => {
    return (
		<Container
			style={{
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<ActivityIndicator
				color={mainColor}
				size="large" />

			{message ? <TranslatedText
				style={{
					fontSize: 20,
					textAlign: 'center',
					color: mainColor,
					marginTop: largePagePadding,
					marginHorizontal: largePagePadding,
				}}
				text={message} /> : null}
		</Container>
    )
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			colors: {
				mainColor,
			},
			styles: {
				largePagePadding,
			},
		},
	},
}) => ({
	mainColor,
	largePagePadding,
})

export default connect(mapStateToProps)(ScreenLoadingIndicator)