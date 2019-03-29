import React, {
    Component
} from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    StyleSheet,
    View
} from 'react-native';
import {
    Tile,
    List,
    ListItem,
    Button
} from 'react-native-elements';

class Me extends Component {
    handleSettingsPress = () => {
        this.props.navigation.navigate('Settings');
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Tile
                    //Faire une condition si il y a une image d'enregistré
                    imageSrc={'../../utils/img/userAnonymous.png'}
                    featured
                    title={'Profil'}/>

                    <ListItem
                    title="Nom"
                    rightTitle={'Palarski'}
                    hideChevron/>
                    <ListItem
                    title="Prénom"
                    rightTitle={'Stevy'}
                    hideChevron/>
                    <ListItem
                    title="Email"
                    rightTitle={'stevy.palarski@gmail.com'}
                    hideChevron/>
                    <ListItem
                    title="Anniversaire"
                    rightTitle={'11/11/1998'}
                    hideChevron/>
                    <ListItem
                    title="Ville"
                    rightTitle={'Strasbourg'}
                    hideChevron/>

                    <TouchableOpacity
                    style={styles.button}
                    onPress={this.handleSettingsPress}
                    activeOpacity={0.8}>
                        <Text style={styles.textButton}>
                            Paramètres
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

export default Me;

//Feuille de style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    button: {
        backgroundColor: '#2c3e50',
        borderRadius: 5,
        padding: 8,
        marginBottom: 5,
        width: '90%',
        alignItems: 'center'
    },
    textButton: {
        color: '#fff',
        fontSize: 18
    }
});
