import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';
import Page from './pages/Page.container';
import "./css/global.scss";

const App = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Page />
        </PersistGate>
    </Provider>
);

export default App;
