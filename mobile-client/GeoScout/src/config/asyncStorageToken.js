import { AsyncStorage } from 'react-native';

setTokenAsyncStorage = async (userToken) => {
    console.log(userToken);
    try {
        await AsyncStorage.setItem('GeoScoutToken', userToken);
    }catch (error) {
        //GESTION DES ERREURS
    }
};

getTokenAsyncStorage = async () => {
    console.log("Try get token");
    return AsyncStorage.getItem('GeoScoutToken').then((token) => {
        console.log(`token : ${token}`);
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