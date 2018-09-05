import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Divider } from 'react-native-elements';
import { wrap } from 'starterkit/themes';
import RemoteImage from 'starterkit/src/components/RemoteImage';

import Icon from 'starterkit/src/elements/Icon';

@wrap
export default class ItemContact extends React.PureComponent {
  avatar() {
    const id = this.props.index % 6;
    if (id === 0 || id === 1 || id === 2) {
      return 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg';
    }
    return 'https://avatar.guu.vn/avatar/capricornian.jpg';
  }

  paymentTopUp(item) {
    const { navigator, screenInstanceID } = this.props;
    navigator.push({
      screen: 'TopUp_TopUpPayment',
      title: 'Phone Topup',
      passProps: { item, screenId: screenInstanceID }
    });
  }
  render() {
    const { item, isCall } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.paymentTopUp(item)}
        cls="flx-row aic jcsb pv2 mr2 ml2"
      >
        <View cls="flx-row">
          <View cls="aic">
            <RemoteImage cls="circleFn-40" source={this.avatar()} />
          </View>
          {isCall ? (
            <Icon name="phone" size={24} cls={['ml2 colorTextFn-gray', { red: item.isUnread }]} />
          ) : null}
          <View cls="flx-i ml2">
            <View cls="flx-row mt2">
              <View cls="flx-i ml2">
                <Text cls={['f11 dark fw5']}>{`${item.givenName} ${item.familyName}`}</Text>
              </View>

              <View cls=" flx-i aife mr3">
                <Text cls={['fw1 colorTextFn-#004794 f11 fw6']}>
                  {item.phoneNumbers.length == 0 ? 'Không có số' : item.phoneNumbers[0].number}
                </Text>
              </View>
            </View>
            <Divider cls="ba b--lightGray mt3" />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
