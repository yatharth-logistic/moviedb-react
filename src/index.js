import React from 'react';
import ReactDOM from 'react-dom';
import Moviedb from './moviedb/Moviedb';
import { Provider } from 'react-redux';
import { store } from './store';

import { stopReportingRuntimeErrors } from 'react-error-overlay';

if (process.env.NODE_ENV === "development") {
    stopReportingRuntimeErrors(); // disables error overlays
}

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store} >
            <Moviedb />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
