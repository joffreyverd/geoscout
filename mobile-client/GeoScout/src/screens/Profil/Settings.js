import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';

import { NavigationHeader } from '../../components/NavigationDrawer';

export default class Settings extends Component {
    render() {
        return (
            <>
                <NavigationHeader
                    pressMenu={this.props.navigation.openDrawer}
                    titleText={'Paramètres'}
                    pressHome={() =>
                        this.props.navigation.navigate('GeoLocation')
                    }
                />
                <ScrollView>
                    <ListItem title="Notifications" />
                    <ListItem title="Profile" />
                    <ListItem title="Password" />
                    <ListItem title="Sign Out" rightIcon={{ name: 'cancel' }} />
                </ScrollView>
            </>
        );
    }
}
