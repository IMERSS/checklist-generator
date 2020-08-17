import { parseCsv } from '../../helpers/csv';

export const SET_DATA = 'SET_DATA';
export const uploadFile = (file) => (dispatch) => {
    parseCsv(file)
        .then((data) => {
            dispatch({
                type: SET_DATA,
                payload: {
                    data
                }
            });
        })
};


export const SET_PAGE_INDEX = 'SET_PAGE_INDEX';
export const setPageIndex = (pageIndex) => ({ type: SET_PAGE_INDEX, payload: { pageIndex }})