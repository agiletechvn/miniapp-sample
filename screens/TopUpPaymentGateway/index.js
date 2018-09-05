import React from 'react';
import { wrap } from 'starterkit/themes';
import PaymentGateway from 'starterkit/src/components/Payment/PaymentGateway';

@wrap
export default class TopUpPaymentGateway extends React.Component {
  onBackdropPress = () => {
    const { navigator, isMakingTransaction, screenId } = this.props;

    navigator.push({
      screen: isMakingTransaction ? 'transactionDetail' : 'cardList',
      title: isMakingTransaction ? 'Transaction Detail' : 'Card List',
      backButtonHidden: true,
      passProps: {
        screenId
      },
      navigatorStyle: {
        disabledBackGesture: true
      }
    });
  };
  render() {
    const { isMakingTransaction } = this.props;
    return (
      <PaymentGateway
        navigator={this.props.navigator}
        onBackdropPress={this.onBackdropPress}
        isMakingTransaction={isMakingTransaction}
      />
    );
  }
}
