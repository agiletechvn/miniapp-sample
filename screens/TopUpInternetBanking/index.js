import React from 'react';
import { wrap } from 'starterkit/themes';
import InternetBanking from 'starterkit/src/components/Payment/InternetBanking';

@wrap
export default class TopUpInternetBanking extends React.Component {
  onItemPress = () => {
    const { navigator } = this.props;
    navigator.push({
      screen: 'TopUp_TopUpPaymentGateway',
      title: '3D Secure',
      passProps: {
        isMakingTransaction: true
      }
    });
  };
  render() {
    return <InternetBanking onItemPress={this.onItemPress} navigator={this.props.navigator} />;
  }
}
