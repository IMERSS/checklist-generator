import Thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import settingsReducer from './settings/settings.reducer';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['settings'],
};

const settingsPersistConfig = {
  key: 'settings',
  storage,
  blacklist: ['documentRowPlaceholdersGenerated'],
};

const rootReducer = combineReducers({
  settings: persistReducer(settingsPersistConfig, settingsReducer),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(Thunk))
);

const persistor = persistStore(store);

export default store;
export { persistor };
