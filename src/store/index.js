import Thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from '';



const globalReducer = createStore(
    rootReducer,
    compose(
        applyMiddleware(Thunk)
    )
);