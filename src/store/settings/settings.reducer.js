import { nanoid } from 'nanoid';
import * as actions from './settings.actions';
import { removeArrayItem } from '../../helpers/utils';


const initialState = {
    pageIndex: 0,
    data: null,
    rows: {},
    sortedRows: []
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
        case actions.SELECT_COLUMN: {
            const { rowId, colIndex } = action.payload;

            console.log(action.payload);

            return {
                ...state,
                rows: {
                    ...state.rows,
                    [rowId]: {
                        ...state.rows[rowId],
                        colIndex: colIndex
                    }
                }
            };
        }
        case actions.ADD_ROW:
            const newRowId = nanoid(6);
            return {
                ...state,
                sortedRows: [
                    ...state.sortedRows,
                    newRowId
                ],
                rows: {
                    ...state.rows,
                    [newRowId]: {
                        colIndex: null,
                        indent: true,
                        format: '%VALUE%'
                    }
                }
            };
        case actions.DELETE_ROW: {
            const newSortedRows = removeArrayItem(state.sortedRows, action.payload.rowId);
            const newRows = { ...state.rows };
            delete newRows[action.payload.rowId];

            return {
                ...state,
                sortedRows: newSortedRows,
                rows: newRows
            };
        }
        case actions.TOGGLE_ROW_INDENTATION: {
            return {
                ...state,
                rows: {
                    ...state.rows,
                    [action.payload.rowId] : {
                        ...state.rows[action.payload.rowId],
                        indent: !state.rows[action.payload.rowId].indent
                    }
                }
            };
        }
        default:
            return state;
    }
}

export default settingsReducer;