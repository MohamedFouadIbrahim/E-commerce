import React from 'react'
import { View } from 'react-native';
import CustomSelector from '../CustomSelector/index';
import ConfirmModal from '../ConfirmModal/index';
import { withLocalize } from 'react-localize-redux';
class CustomSelectorForDelete extends React.Component {
    constructor(props) {
        super(props)
        this.confirmRef = React.createRef();
        this.CustomSelectorForDeleteref = React.createRef();
        this.state = {
            Options: [
                { Id: 1, Name: props.translate('Delete') },
                { Id: 2, Name: props.translate('Edit') },
            ],
            Options2: [{ Id: 1, Name: props.translate('Delete') }],
            selectedOptions: {}
        }
    }

    componentDidUpdate() {
        if (this.props.showCustomSelectorForDeleteref == true) {
            this.CustomSelectorForDeleteref.current.show()
        }
    }

    render() {
        const { Options, Options2, selectedOptions } = this.state
        return (
            <View>
                <CustomSelector
                    ref={this.CustomSelectorForDeleteref}
                    options={
                        this.props.justForDelete == true ?
                            Options2.map(item => item.Name) :
                            Options.map(item => item.Name)
                    }
                    onSelect={(index) => {
                        if (index == 0) {
                            this.confirmRef.current.show();
                            this.setState({ selectedOptions: this.state.Options[index] })
                        } else {
                            this.setState({ selectedOptions: this.state.Options[index] }, () => {
                                if (this.props.onEdit) {
                                    this.props.onEdit()
                                }
                            })
                        }
                    }}
                    onDismiss={this.props.onCancelDelete}
                />
                <ConfirmModal
                    ref={this.confirmRef}
                    onConfirm={() => {
                        
                        if (this.props.onDelete && selectedOptions.Id == 1) {
                            this.props.onDelete()
                        }
                    }}
                    onResponse={(check)=>{
                        if(check == false) {
                            this.props.onCancelConfirm()
                        }
                    }}
                />
            </View>
        )
    }
}

export default withLocalize(CustomSelectorForDelete) 