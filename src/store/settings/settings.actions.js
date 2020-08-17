import { parseCsv } from '../../helpers/csv';

export const SET_DATA = 'SET_DATA';
export const uploadFile = (file) => (dispatch) => {
    parseCsv(file)
        .then((resp) => {
            dispatch({
                type: SET_DATA,
                payload: {
                    data: resp.data
                }
            });
        })
};


export const SET_PAGE_INDEX = 'SET_PAGE_INDEX';
export const setPageIndex = (pageIndex) => ({ type: SET_PAGE_INDEX, payload: { pageIndex }});

export const SELECT_COLUMN = 'SELECT_COLUMN';
export const selectColumn = (rowId, colIndex) => ({ type: SELECT_COLUMN, payload: { rowId, colIndex }});

export const ADD_ROW = 'ADD_ROW';
export const addRow = () => ({ type: ADD_ROW });

export const DELETE_ROW = 'DELETE_ROW';
export const deleteRow = (rowId) => ({ type: DELETE_ROW, payload: { rowId }});

export const TOGGLE_ROW_INDENTATION = 'TOGGLE_ROW_INDENTATION';
export const toggleRowIndentation = (rowId) => ({ type: TOGGLE_ROW_INDENTATION, payload: { rowId }});
