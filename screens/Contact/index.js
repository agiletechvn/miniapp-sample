import React from 'react';
import { FlatList, Platform, PermissionsAndroid, View, Text } from 'react-native';
import Contacts from 'react-native-contacts';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { wrap } from 'starterkit/themes';
import SearchBar from 'starterkit/src/components/SearchBar';
import ItemContact from './ItemContact';

@connect(state => ({}), {}, (stateProps, dispatchProps, ownProps) => ({
  initialValues: {
    enableReinitialize: true
  },
  ...ownProps,
  ...stateProps,
  ...dispatchProps
}))
@reduxForm({
  form: 'ContactTopUp',
  validate: values => {}
})
@wrap
export default class ContactTopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: ''
    };
  }

  componentWillMount() {
    this.getContacts();
  }
  async getContacts() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Starterkit App Contacts Permission',
            message: 'Starterkit App needs access to your contacts'
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Contacts.getAll((err, contacts) => {
            if (err) this.setState({ error: 'Không cho phép đồng bộ danh bạ' });
            else this.setState({ data: contacts });
          });
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      Contacts.getAll((err, contacts) => {
        if (err) {
          console.log(err);
        }
        this.setState({ data: contacts });
      });
    }
    Contacts.getAll((err, contacts) => {
      if (err) {
        this.setState({ error: 'Không cho phép đồng bộ danh bạ' });
      } else this.setState({ data: contacts });
    });
  }

  renderItem = ({ item, index }) => (
    <ItemContact
      screenInstanceID={this.props.screenInstanceID}
      navigator={this.props.navigator}
      item={item}
      index={index}
    />
  );

  render() {
    return (
      <View cls="flx-i">
        {this.state.error !== '' ? (
          <View cls="flx-i jcc aic">
            <Text>{this.state.error}</Text>
          </View>
        ) : null}
        <View cls="mr2 ml2 mt3">
          <SearchBar editable br />
        </View>
        <FlatList
          cls="mt3"
          removeClippedSubviews
          data={this.state.data}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
