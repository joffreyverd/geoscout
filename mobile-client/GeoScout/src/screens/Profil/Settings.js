import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';

import { NavigationHeader, NavigationMenu } from '../../components/NavigationMenu';

export default class Settings extends Component {
  constructor(){
    super();
    this.state = {
        menuOpen: false
    };
  }

  render() {
    const { menuOpen } = this.state;
    return (
      <NavigationMenu
      isOpen={menuOpen}
      toggle={menuOpen => this.setState({ menuOpen })}
      navigate={this.props.navigation.navigate}>
      <NavigationHeader
      pressMenu={() => this.setState({ menuOpen: true })}
      titleText={'Paramètres'}
      pressHome={() => this.props.navigation.navigate('GeoLocation')}/>
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
      </NavigationMenu>
    );
  }
}