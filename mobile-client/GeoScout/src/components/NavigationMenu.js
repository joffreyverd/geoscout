import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Header, Icon } from 'react-native-elements';
import SideMenu from 'react-native-side-menu';
import { ScrollView } from 'react-native-gesture-handler';

const {width,height} = Dimensions.get('window')

export function NavigationMenu({
    isOpen,
    children,
    toggle,
    navigate
}) {
    return (
        <SideMenu
            isOpen={isOpen}
            disableGestures={true}
            openMenuOffset={width*0.7}
            onChange={opened => opened !== isOpen ? toggle(opened): null}
            menu={
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                        {/* <View style={{flexDirection: 'row',flex: 2, paddingLeft: 15, backgroundColor: '#ecf0f1', minHeight: height*0.2, marginBottom: 20, alignItems: 'center'}}>
                            <View style={{backgroundColor: '#bdc3c7', height: height*0.1, width: width*0.2}}>
                            </View>
                            <Text style={styles.item}>Nom & prénom</Text>
                        </View> */}
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'baseline', paddingLeft: 20, marginTop: 40}}>
                            <Icon
                            name='map'
                            type='font-awesome'
                            size={24}
                            color='#1abc9c'/>
                            <Text
                            numberOfLines={1}
                            style={styles.item}
                            onPress={() => {
                                navigate('GeoLocation');
                            }}>
                                Carte
                            </Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'baseline', paddingLeft: 20}}>
                            <Icon
                            name='user-circle'
                            type='font-awesome'
                            size={24}
                            color='#1abc9c'/>
                            <Text
                            numberOfLines={1}
                            style={styles.item}
                            onPress={() => {
                                navigate('Profil');
                            }}>
                                Profil
                            </Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'baseline', paddingLeft: 20}}>
                            <Icon
                            name='cloud-download'
                            type='material'
                            size={24}
                            color='#1abc9c'/>
                            <Text
                            numberOfLines={1}
                            style={styles.item}
                            onPress={() => {
                                navigate('DownloadCircuit');
                            }}>
                                Circuit téléchargé
                            </Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'baseline', paddingLeft: 20}}>
                            <Icon
                            name='favorite'
                            type='material'
                            size={24}
                            color='#1abc9c'/>
                            <Text
                            numberOfLines={1}
                            style={styles.item}
                            onPress={() => {
                                navigate('FavoriteCircuit');
                            }}>
                                Circuit favoris
                            </Text>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            }
        >
            {children}
        </SideMenu>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
    },
    item: {
        color: '#2c3e50',
        marginBottom: 10,
        fontSize: 18,
        marginLeft: 10
    }
});

export function NavigationHeader({ pressMenu, titleText, rightComponent }) {
    return (
        <Header
        placement="left"
        leftComponent={{
            icon: 'menu',
            color: 'white',
            onPress: pressMenu
        }}
        centerComponent={{ text: titleText, style: { color: '#fff', fontSize: 18 } }}
        rightComponent={rightComponent}
        backgroundColor='#1abc9c'/>
    )
}