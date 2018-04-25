import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';

import PayslipContainer from './container/payslip.container';

const store = configureStore();

render(
    <Provider store={store}>
        <PayslipContainer />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();