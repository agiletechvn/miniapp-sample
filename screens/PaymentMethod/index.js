import React from 'react';
import { connect } from 'react-redux';
import { wrap, sizes } from 'starterkit/themes';
import { reduxForm } from 'redux-form';
import PaymentMethodComponent from 'starterkit/src/components/Payment/PaymentMethod';
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
  form: 'TopUpPaymentMethodForm',
  validate: values => {},
  destroyOnUnmount: !__DEV__
})
@wrap
export default class PaymentMethod extends React.PureComponent {
  onSubmitPress = values => {
    const { navigator, screenId } = this.props;
    if (values.paymentSource) {
      navigator.push({
        screen: this.getScreenId(values.paymentSource.id),
        title: this.getScreenTitle(values.paymentSource.id),
        passProps: {
          isMakingTransaction: true,
          screenId
        }
      });
    }
  };

  getScreenTitle = paymentSourceId => {
    switch (paymentSourceId) {
      case 1:
        return 'Submit Method';
      case 8:
        return '';
      default:
        return 'Topup ZO-TA PAY';
    }
  };

  getScreenId = paymentSourceId => {
    switch (paymentSourceId) {
      case 1:
        return 'TopUp_PaymentValidator';
      case 8:
        return 'TopUp_TopUpInternetBanking';
      default:
        return 'TopUp_TopUpPaymentCard';
    }
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <PaymentMethodComponent
        handleSubmit={handleSubmit}
        navigator={this.props.navigator}
        onSubmitPress={this.onSubmitPress}
      />
    );
  }
}
