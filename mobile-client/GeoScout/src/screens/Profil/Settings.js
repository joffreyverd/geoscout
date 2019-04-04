import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';

class Settings extends Component {
  render() {
    return (
      <ScrollView>
          <ListItem
            title="Notifications"
          />
          <ListItem
            title="Profile"
          />
          <ListItem
            title="Password"
          />
          <ListItem
            title="Sign Out"
            rightIcon={{ name: 'cancel' }}
          />
      </ScrollView>
    );
  }
}

export default Settings;