import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import './css/index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(

    <HashRouter>
        <App />
    </HashRouter>,

    document.getElementById('root'),
);

serviceWorker.unregister();
