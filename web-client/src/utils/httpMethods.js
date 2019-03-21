const API_HOST = process.env.REACT_APP_API_URL;

/**
 *
 * @param {*} response
 */
async function checkStatus(response) {
    if (response.ok) {
        if (response.status === 204) return Promise.resolve();
        return Promise.resolve(response.json());
    }
    return Promise.reject({ code: response.status, text: await response.text() });
}


/**
 * Fonction d'envoie d'une requête au serveur
 * @param {String} route : La route de la requête (sans l'url du serveur)
 * @param {String} method : La méthode de la requête
 * @param {Object} body : Un objet représentant le body de la requête
 */
function request(route, method, body) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    if (localStorage.getItem('token')) {
        options.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    }

    if (body) {
        options.body = JSON.stringify(body);
    }

    return fetch(API_HOST + route, options)
        .then(checkStatus);
}


export default {
    get: route => request(route, 'GET'),
    post: (route, body) => request(route, 'POST', body),
    put: (route, body) => request(route, 'PUT', body),
    delete: route => request(route, 'DELETE'),
};
