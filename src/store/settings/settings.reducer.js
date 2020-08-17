import * as actions from './settings.actions';

const initialState = {
    pageIndex: 0,
    data: null
};

const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_PAGE_INDEX:
            return {
                ...state,
                pageIndex: action.payload.pageIndex
            };
        case actions.SET_DATA:
            return {
                ...state,
                data: action.payload.data
            };
        default:
            return state;
    }
}

export default settingsReducer;