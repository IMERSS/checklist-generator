import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ReactNotification from "react-notifications-component";
import store, { persistor } from './store';
import Page from './pages/Page.container';
import "./css/global.scss";
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.compat.css';

const App = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ReactNotification />
            <Page />
        </PersistGate>
    </Provider>
);

export default App;
