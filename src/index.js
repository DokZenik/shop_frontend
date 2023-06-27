import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {store} from './Redux/store';
import {Provider} from 'react-redux';
import CurrencyProvider from "./components/utils/Currency/CurrensyContext";


ReactDOM.render(
    <Provider store={store}>
        <CurrencyProvider>
            <App/>
        </CurrencyProvider>
    </Provider>,

    document.getElementById('root'),
);
