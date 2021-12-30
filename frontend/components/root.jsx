import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './app';

import '../node_modules/@fortawesome/fontawesome-free/js/all.js';
import '../styles/root.css';

export default ({ store }) => (
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>
)