import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { positions, Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import App from './App';
import './css/index.css';
import * as serviceWorker from './serviceWorker';

const options = {
    timeout: 1500,
    transition: 'fade',
    position: positions.TOP_CENTER,
    containerStyle: {
        zIndex: 1031,
    },
};

ReactDOM.render(


    <HashRouter>
        <Provider template={AlertTemplate} {...options}>
            <App />
        </Provider>
    </HashRouter>,

    document.getElementById('root'),
);

serviceWorker.unregister();
