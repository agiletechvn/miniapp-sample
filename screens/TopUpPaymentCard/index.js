import React from 'react';
import { View, Platform } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { wrap } from 'starterkit/themes';
import PaymentCard from 'starterkit/src/components/Payment/PaymentCard';

@connect(
  state => ({}),
  {},
  (stateProps, dispatchProps, ownProps) => ({
    initialValues: {
      enableReinitialize: true
    },
    ...ownProps,
    ...stateProps,
    ...dispatchProps
  })
)
@reduxForm({
  form: 'TopupPaymentCardForm',
  validate: values => {},
  destroyOnUnmount: !__DEV__
})
@wrap
export default class TopUpPaymentCard extends React.Component {
  onSubmitPress = values => {
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
    const { navigator, handleSubmit } = this.props;
    return (
      <PaymentCard
        onSubmitPress={this.onSubmitPress}
        navigator={navigator}
        handleSubmit={handleSubmit}
      />
    );
  }
}
