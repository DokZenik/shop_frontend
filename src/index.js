import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {store} from './Redux/store';
import {Provider} from 'react-redux';
// import {disableReactDevTools} from "@fvilers/disable-react-devtools";

// if(process.env.NODE_ENV === 'production') disableReactDevTools()
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,

    document.getElementById('root'),
);
