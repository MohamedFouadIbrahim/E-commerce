import React from 'react';
import { connect } from 'react-redux'
import CodeInput from 'react-native-confirmation-code-input';

class ConfirmationCodeInput extends React.Component {
    render() {
		const {
			mainColor,
		} = this.props;

        return (
            <CodeInput
                ref="codeInputRef1"
                className={'border-box'}
                keyboardType="numeric"
                space={5}
                size={40}
                inputPosition='left'
                onFulfill={(code) => this.props.onConfirm(code)}
                codeInputStyle={{
                    flex: 1,
                    fontSize: 25,
                    borderRadius: 7,
                    backgroundColor:  mainColor,
                    textAlign: 'center',
                }}
                codeLength={6}
            />
        )
    }
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			colors,
		},
	},
}) => ({
	...colors,
})

export default connect(mapStateToProps)(ConfirmationCodeInput)