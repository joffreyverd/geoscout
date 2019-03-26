import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Tile, List, ListItem, Button, FormLabel, FormInput } from 'react-native-elements';
import { me } from '../config/data';

class Me extends Component {
  handleSettingsPress = () => {
    this.props.navigation.navigate('Settings');
  };

  render() {
    return (
      <ScrollView>
        <Tile
          //Faire une condition si il y a une image d'enregistré
          imageSrc={'../../utils/img/userAnonymous.png'}
          featured
          title={`${('Stevy').toUpperCase()} ${('Palarski').toUpperCase()}`}
          caption={'stevy.palarski@gmail.com'}
        />

        <Button
          title="Settings"
          buttonStyle={{ marginTop: 20 }}
          onPress={this.handleSettingsPress}
        />

        <List>
          <ListItem
            title="Email"
            rightTitle={this.props.email}
            hideChevron
          />
        </List>

        <List>
          <ListItem
            title="Anniversaire"
            rightTitle={'11/11/1998'}
            hideChevron
          />
          <ListItem
            title="Ville"
            rightTitle={'Strasbourg'}
            hideChevron
          />
        </List>
      </ScrollView>
    );
  }
}

Me.defaultProps = { ...me };

export default Me;