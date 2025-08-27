import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ReactNotification from 'react-notifications-component';
import store, { persistor } from './store';
import * as actions from './store/settings/settings.actions';
import * as selectors from './store/settings/settings.selectors';
import C from './constants';
import Page from './pages/Page.container';
import './css/global.scss';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.compat.css';

const checkState = async (state) => {
  const lastAppStateVersion = selectors.getAppStateVersion(state.getState());
  if (lastAppStateVersion !== C.APP_STATE_VERSION) {
    await state.dispatch(actions.purge());
  }
};

const App = () => (
  <Provider store={store}>
    <PersistGate
      loading={null}
      persistor={persistor}
      onBeforeLift={() => checkState(store, persistor)}
    >
      <ReactNotification />
      <Page />
    </PersistGate>
  </Provider>
);

export default App;
