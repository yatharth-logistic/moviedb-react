import React from 'react';
import ReactDOM from 'react-dom';
import Moviedb from './moviedb/Moviedb';
import { Provider } from 'react-redux';
import { store } from './store';


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store} >
            <Moviedb />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
