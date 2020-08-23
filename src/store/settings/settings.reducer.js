import { nanoid } from 'nanoid';
import * as actions from './settings.actions';
import { removeArrayItem } from '../../helpers/utils';

const initialState = {
    pageIndex: 0,
    data: null,
    rows: {},
    sortedRows: [],
    builderTab: 0,
    format: "html", // text/html
    textIndentNumSpaces: 4,
    htmlIndentWidth: 50,
    rowClassPrefix: "cg-row-"
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
                        format: '{{it.VALUE}}'
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
        case actions.UPDATE_ROW_FORMAT: {
            const { rowId, format } = action.payload;
            return {
                ...state,
                rows: {
                    ...state.rows,
                    [rowId] : {
                        ...state.rows[rowId],
                        format
                    }
                }
            }
        }
        case actions.SET_BUILDER_TAB: {
            return {
                ...state,
                builderTab: action.payload.tab
            };
        }
        case actions.UPDATE_FORMAT: {
            return {
                ...state,
                format: action.payload.format
            };
        }
        case actions.UPDATE_HTML_INDENT_WIDTH: {
            return {
                ...state,
                htmlIndentWidth: action.payload.htmlIndentWidth
            };
        }
        case actions.UPDATE_ROW_CLASS_PREFIX: {
            return {
                ...state,
                rowClassPrefix: action.payload.prefix
            };
        }
        default:
            return state;
    }
}

export default settingsReducer;