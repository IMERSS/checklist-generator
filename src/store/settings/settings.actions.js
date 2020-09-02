import { parseCsv } from '../../helpers/csv';

export const SET_DATA = 'SET_DATA';
export const uploadFile = (file) => (dispatch) => {
    parseCsv(file)
        .then((resp) => {
            dispatch({
                type: SET_DATA,
                payload: {
                    uploadedFilename: file.path,
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
export const addRow = (rowSettings) => ({ type: ADD_ROW, payload: { ...rowSettings } });

export const DELETE_ROW = 'DELETE_ROW';
export const deleteRow = (rowId) => ({ type: DELETE_ROW, payload: { rowId }});

export const CLEAR_ROWS = 'CLEAR_ROWS';
export const clearRows = () => ({ type: CLEAR_ROWS });

export const TOGGLE_ROW_INDENTATION = 'TOGGLE_ROW_INDENTATION';
export const toggleRowIndentation = (rowId) => ({ type: TOGGLE_ROW_INDENTATION, payload: { rowId }});

export const UPDATE_ROW_FORMAT = 'UPDATE_ROW_FORMAT';
export const updateRowFormat = (rowId, format) => ({ type: UPDATE_ROW_FORMAT, payload: { rowId, format }});

export const SET_BUILDER_TAB = 'SET_BUILDER_TAB';
export const setBuilderTab = (tab) => ({ type: SET_BUILDER_TAB, payload: { tab }});

export const UPDATE_FORMAT = 'UPDATE_FORMAT';
export const updateFormat = (format) => ({ type: UPDATE_FORMAT, payload: { format }});

export const UPDATE_HTML_INDENT_WIDTH = 'UPDATE_HTML_INDENT_WIDTH';
export const updateHtmlIndentWidth = (htmlIndentWidth) => ({ type: UPDATE_HTML_INDENT_WIDTH, payload: { htmlIndentWidth }});

export const UPDATE_ROW_CLASS_PREFIX = 'UPDATE_ROW_CLASS_PREFIX';
export const updateRowClassPrefix = (prefix) => ({ type: UPDATE_ROW_CLASS_PREFIX, payload: { prefix }});

export const UPDATE_TEXT_INDENT_NUM_SPACES = 'UPDATE_TEXT_INDENT_NUM_SPACES';
export const updateTextIndentNumSpaces = (numSpaces) => ({ type: UPDATE_TEXT_INDENT_NUM_SPACES, payload: { numSpaces }});

export const RESET = 'RESET';
export const onReset = () => ({ type: 'RESET' });

export const CLEAR_SETTINGS_ERROR = 'CLEAR_SETTINGS_ERROR';
export const clearSettingsError = () => ({ type: CLEAR_SETTINGS_ERROR });

export const ERROR_PARSING_SETTINGS = 'ERROR_PARSING_SETTINGS';
export const errorParsingSettings = (error) => ({
    type: ERROR_PARSING_SETTINGS,
    payload: {
        error
    }
});

export const SET_SAVED_SETTINGS = 'SET_SAVED_SETTINGS';
export const setSavedSettings = (settings) => ({ type: SET_SAVED_SETTINGS, payload: { ...settings } });

export const processSettings = (settingsStr) => (dispatch) => {
    dispatch(clearSettingsError());

    try {
        const settings = JSON.parse(settingsStr);

        // extract as much valid setting data as we can. TODO The validation is totally feeble here... it'd be much better to
        // define a schema for the settings and validate against that

        if (settings.rows && Array.isArray(settings.rows)) {
            dispatch(clearRows());
            settings.rows.forEach((row) => {
                if (!row.hasOwnProperty('colIndex') || !row.hasOwnProperty('indent') || !row.hasOwnProperty('format')) {
                    return;
                }
                if (row.indent !== true && row.indent !== false) {
                    return;
                }
                dispatch(addRow({
                    colIndex: row.colIndex,
                    indent: row.indent,
                    format: row.format
                }));
            });
        }

        if (settings.format && ['html', 'rtf', 'text'].indexOf(settings.format) !== -1) {
            dispatch(updateFormat(settings.format));
        }
        if (settings.textIndentNumSpaces) {
            dispatch(updateTextIndentNumSpaces(settings.textIndentNumSpaces));
        }
        if (settings.htmlIndentWidth) {
            dispatch(updateHtmlIndentWidth(settings.htmlIndentWidth));
        }
        if (settings.rowClassPrefix) {
            dispatch(updateRowClassPrefix(settings.rowClassPrefix));
        }
    } catch (e) {
        dispatch(errorParsingSettings(e.message));
    }
};
