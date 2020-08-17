import Thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import settingsReducer from './settings/settings.reducer';

const rootReducer = combineReducers({
    settings: settingsReducer
});

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(Thunk)
    )
);

export default store;