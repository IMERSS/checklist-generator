import { nanoid } from 'nanoid';
import * as actions from './settings.actions';
import { removeArrayItem } from '../../helpers/utils';

const initialState = {
    pageIndex: 0,
    uploadedFilename: '',
    data: null,
    rows: {},
    sortedRows: [],
    builderTab: 0,
    autoUpdate: true,
    format: "html", // "html", "text", "rtf"
    textIndentNumSpaces: 4,
    htmlIndentWidth: 50,
    rowClassPrefix: "cg-col-",
    rtfDefaultFontSize: 13,
    rtfDefaultLineHeight: 80,
    loadSettingsError: null,
    applySettingsDialogOpen: false,
    rowSettingsDialogOpen: false,
    editingRowId: null, // for the row settings dialog

    // there's a better way to do this that I keep forgetting... need to imperatively update display panel when auto-update is disabled
    regenerationCount: 0
};

const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.RESET: {
            return {
                ...state,
                data: null,
                uploadedFilename: '',
                rows: {},
                sortedRows: [],
                builderTab: 0,
                loadSettingsError: null,
                applySettingsDialogOpen: false,
                rowSettingsDialogOpen: false,
                editingRowId: null
            };
        }
        case actions.SET_PAGE_INDEX:
            return {
                ...state,
                pageIndex: action.payload.pageIndex
            };
        case actions.SET_DATA:
            return {
                ...state,
                uploadedFilename: action.payload.uploadedFilename,
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
                        colIndex,
                        settings: {}
                    }
                }
            };
        }
        case actions.ADD_ROW: {
            const newRowSettings = {
                colIndex: null,
                indent: true,
                errors: [],
                format: '{{it.VALUE}}',
                settings: {},
                ...action.payload
            };

            const newRowId = nanoid(6);
            return {
                ...state,
                sortedRows: [
                    ...state.sortedRows,
                    newRowId
                ],
                rows: {
                    ...state.rows,
                    [newRowId]: newRowSettings
                }
            };
        }
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
        case actions.CLEAR_ROWS: {
            return {
                ...state,
                sortedRows: [],
                rows: {}
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
        case actions.UPDATE_SETTING: {
            let autoUpdate = state.autoUpdate;
            if (action.payload.setting === 'format' && action.payload.value === 'rtf') {
                autoUpdate = false;
            }
            return {
                ...state,
                [action.payload.setting]: action.payload.value,
                autoUpdate
            };
        }
        case actions.ERROR_PARSING_SETTINGS: {
            return {
                ...state,
                loadSettingsError: action.payload.error
            };
        }
        case actions.CLEAR_SETTINGS_ERROR: {
            return {
                ...state,
                loadSettingsError: null
            };
        }
        case actions.OPEN_APPLY_SETTINGS_DIALOG: {
            return {
                ...state,
                applySettingsDialogOpen: true
            };
        }
        case actions.CLOSE_APPLY_SETTINGS_DIALOG: {
            return {
                ...state,
                applySettingsDialogOpen: false
            };
        }
        case actions.OPEN_ROW_SETTINGS_DIALOG: {
            return {
                ...state,
                rowSettingsDialogOpen: true,
                editingRowId: action.payload.rowId
            };
        }
        case actions.CLOSE_ROW_SETTINGS_DIALOG: {
            return {
                ...state,
                rowSettingsDialogOpen: false
            };
        }
        case actions.UPDATE_ROW_SETTINGS: {
            return {
                ...state,
                rows: {
                    ...state.rows,
                    [state.editingRowId]: {
                        ...state.rows[state.editingRowId],
                        settings: action.payload.settings
                    }
                }
            };
        }
        case actions.UPDATE_ROW_FORMAT_ERROR: {
            return {
                ...state,
                rows: {
                    ...state.rows,
                    [action.payload.rowId]: {
                        ...state.rows[action.payload.rowId],
                        errors: action.payload.errors
                    }
                }
            };
        }
        case actions.SET_AUTO_UPDATE: {
            return {
                ...state,
                autoUpdate: action.payload.enabled
            };
        }
        case actions.MANUAL_UPDATE: {
            return {
                ...state,
                regenerationCount: state.regenerationCount+1
            };
        }
        default:
            return state;
    }
}

export default settingsReducer;