import { AsyncStorage } from 'react-native';

setTokenAsyncStorage = async (userToken) => {
    try {
        await AsyncStorage.setItem('token', userToken);
    }catch (error) {
        //GESTION DES ERREURS
    }
};

getTokenAsyncStorage = async () => {
    try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
            return value;
        }
    }catch (error) {
        //GESTION DES ERREURS
    }
};

removeTokenAsyncStorage = async () => {
    try {
        await AsyncStorage.removeItem('token');
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