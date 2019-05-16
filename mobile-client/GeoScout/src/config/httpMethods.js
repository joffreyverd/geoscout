import storage from './asyncStorageToken';
//import Config from 'react-native-config';

const API_HOST = 'http://154.49.211.218:5555/';

async function request(route, method, body) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Attente de la récupération du token
    await storage.getTokenAsyncStorage().then(token => {
        if (token) {
            options.headers.authorization = `Bearer ${token}`;
        }
    });

    if (body) {
        options.body = JSON.stringify(body);
    }

    return fetch(API_HOST + route, options).then(checkStatus);
}

async function checkStatus(response) {
    if (response.ok) {
        if (response.status === 204) return Promise.resolve();
        return Promise.resolve(response.json());
    }
    return Promise.reject({
        code: response.status,
        text: await response.text()
    });
}

export default {
    get: route => request(route, 'GET'),
    post: (route, body) => request(route, 'POST', body),
    put: (route, body) => request(route, 'PUT', body),
    delete: route => request(route, 'DELETE')
};
