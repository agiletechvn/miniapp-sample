import React from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { wrap } from 'starterkit/themes';
import { ItemChooserField } from 'starterkit/src/elements/Forms';
import Icon from 'starterkit/src/elements/Icon';
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
  form: 'TopUpPaymentForm',
  validate: values => {},
  destroyOnUnmount: !__DEV__
})
@wrap
export default class TopUpPayment extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
      amountList: ['10000', '20000', '30000', '50000', '100000', '200000', '300000', '500000'],
      providerList: [
        {
          id: 1,
          value: 'http://media.techz.vn/upload/2013/12/26/image-1388048180-viettel.jpg?7'
        },
        {
          id: 2,
          value:
            'https://file4.batdongsan.com.vn/resize/200x200/2018/02/24/20180224224026-4ea3_wm.jpg'
        },
        {
          id: 3,
          value: 'http://dangky3g.com.vn/wp-content/uploads/2015/11/vinaphone.png'
        },
        {
          id: 4,
          value: 'http://file.vforum.vn/hinh/2014/11/vietnamobile-logo.jpg'
        },
        {
          id: 5,
          value:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp7AHZxalhtK4H76Q4hVv3VuyMH2m_vZ_NQOpTxbVfw6gyZC9UZA'
        }
      ]
    };
  }

  onSubmitPress(values) {
    const { navigator, screenId } = this.props;
    if (this.state.item == null) {
      Alert.alert('Alert', 'You must choose the sender');
      return;
    }
    if (!values.amountChooser) {
      Alert.alert('Alert', 'You must choose a card');
      return;
    }
    navigator.push({
      screen: 'TopUp_PaymentMethod',
      title: 'Choose Payment Method',
      passProps: { screenId }
    });
  }

  render() {
    const { handleSubmit } = this.props;
    const { item } = this.state;
    return (
      <View cls="flx-i">
        <View cls="flx-i mt2">
          <View cls="ml2 mr2">
            <Text cls="f9">{'Topup to :'}</Text>
            {item ? (
              <View cls="mt2 bg-gray flx-row pa2 br2">
                <TouchableOpacity onPress={() => this.setState({ item: null })}>
                  <Icon name="times" cls="black" size={15} />
                </TouchableOpacity>

                <View cls="ml2">
                  <Text cls={['f11 dark fw4']}>
                    {`${item.givenName}${' '}${item.familyName}${' - '}${
                      item.phoneNumbers.length == 0 ? 'Không có số' : item.phoneNumbers[0].number
                    }`}
                  </Text>
                </View>
              </View>
            ) : null}
            <Divider cls="b--gray ba mt4" />
          </View>

          <View cls="ph2">
            <Text cls="mt4 ml1">Card value</Text>
            <Field
              name={'amountChooser'}
              component={ItemChooserField}
              dataList={this.state.amountList}
              numberOfColumns={4}
              cls="mt2"
            />
          </View>
        </View>
        <Button
          onPress={handleSubmit(this.onSubmitPress.bind(this))}
          title="Continue"
          containerCls="mb3 mh2"
          buttonCls="bg-red"
        />
      </View>
    );
  }
}
