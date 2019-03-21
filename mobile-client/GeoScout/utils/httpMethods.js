import storage from './asyncStorageToken';
const API_HOST = process.env.REACT_NATIVE_APP_API_URL;

function request(route, method, body) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    if (storage.getTokenAsyncStorage()) {
        options.headers.authorization = `Bearer ${getTokenAsyncStorage}`;
    }

    if (body) {
        options.body = JSON.stringify(body);
    }

    return fetch(API_HOST + route, options)
        .then(checkStatus);
}

function checkStatus(response) {
    if (response.ok) {
        if (response.status === 204)
            return Promise.resolve();
        return Promise.resolve(response.json());
    }
    return Promise.reject({ code: response.status, text: response.text });
}

export default {
    get: route => request(route, 'GET'),
    post: (route, body) => request(route, 'POST', body),
    put: (route, body) => request(route, 'PUT', body),
    delete: route => request(route, 'DELETE'),
};