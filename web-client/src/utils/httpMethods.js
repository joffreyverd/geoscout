const API_HOST = process.env.REACT_APP_API_URL;

function request(route, method, body) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            authorization: localStorage.getItem('token'),
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    return fetch(API_HOST + route, options)
        .then(checkStatus);
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) { return Promise.resolve(response.json()); }

    return Promise.reject({ code: response.status, text: response.text });
}

export default {
    get: route => request(route, 'GET'),
    post: (route, body) => request(route, 'POST', body),
    put: (route, body) => request(route, 'PUT', body),
    delete: route => request(route, 'DELETE'),
};
