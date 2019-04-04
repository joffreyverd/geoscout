import { AsyncStorage } from 'react-native';

setTokenAsyncStorage = async (userToken) => {
    try {
        await AsyncStorage.setItem('GeoScoutToken', userToken);
    }catch (error) {
        //GESTION DES ERREURS
    }
};

getTokenAsyncStorage = async () => {
    return AsyncStorage.getItem('GeoScoutToken').then((token) => {
        return token;
    }).catch(error => console.log(error));
};

removeTokenAsyncStorage = async () => {
    try {
        await AsyncStorage.removeItem('GeoScoutToken');
        return true;
    }catch (error) {
        //GESTION DES ERREURS
        return false;
    }
}

export default{
    setTokenAsyncStorage,
    getTokenAsyncStorage,
    removeTokenAsyncStorage
};