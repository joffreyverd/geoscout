import { AsyncStorage } from 'react-native';

const setTokenAsyncStorage = async (userToken) => {
    try {
        await AsyncStorage.setItem('GeoScoutToken', userToken);
    }catch (error) {
        //GESTION DES ERREURS
    }
};

const getTokenAsyncStorage = async () => {
    return AsyncStorage.getItem('GeoScoutToken').then((token) => {
        return token;
    }).catch(error => console.log(error));
};

const removeTokenAsyncStorage = async () => {
    try {
        await AsyncStorage.removeItem('GeoScoutToken');
        return true;
    }catch (error) {
        //GESTION DES ERREURS
        return false;
    }
};

export default {
    setTokenAsyncStorage,
    getTokenAsyncStorage,
    removeTokenAsyncStorage
};