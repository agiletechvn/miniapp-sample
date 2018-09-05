import React from 'react';
import { Alert } from 'react-native';
import { wrap, sizes, options } from 'starterkit/themes';
import PaymentValidatorComponent from 'starterkit/src/components/Payment/PaymentValidator';
import { reduxForm } from 'redux-form';
@wrap
export default class PaymentValidator extends React.PureComponent {
  onFinishCheckingCode = (isValid: boolean) => {
    if (!isValid) {
      Alert.alert('Confirmation Code', 'Code not match!', [{ text: 'OK' }], { cancelable: false });
    } else {
      Alert.alert(
        'Confirmation Code',
        'Successful!',
        [{ text: 'OK', onPress: this.onContinueToTransaction }],
        { cancelable: false }
      );
    }
  };

  onContinueToTransaction = () => {
    const { navigator, isMakingTransaction, screenId } = this.props;
    navigator.push({
      screen: 'TopUp_TopUpPaymentGateway',
      title: '3D Secure',
      passProps: {
        isMakingTransaction: !!isMakingTransaction,
        screenId
      }
    });
  };

  render() {
    return (
      <PaymentValidatorComponent
        navigator={this.props.navigator}
        onContinueToTransaction={this.onContinueToTransaction}
        onFinishCheckingCode={this.onFinishCheckingCode}
      />
    );
  }
}
