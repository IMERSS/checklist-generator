import { debounce } from 'throttle-debounce';
import { showNotification } from '../../helpers/utils';
import { parseCsv } from '../../helpers/csv';
import {
  validateRtfRow,
  computeDocumentRowPlaceholders,
} from '../../helpers/builder';
import { getFormat } from './settings.selectors';

export const SET_DATA = 'SET_DATA';
export const uploadFile = (file) => (dispatch) => {
  parseCsv(file).then((resp) => {
    // takes up some memory but this computes all the row placeholders for use during generation, which
    // saves a bunch of work when generating the visible result
    computeDocumentRowPlaceholders(resp.data);

    dispatch({
      type: SET_DATA,
      payload: {
        uploadedFilename: file.path,
        data: resp.data,
      },
    });
  });
};

export const SET_PAGE_INDEX = 'SET_PAGE_INDEX';
export const setPageIndex = (pageIndex) => ({
  type: SET_PAGE_INDEX,
  payload: { pageIndex },
});

export const SELECT_COLUMN = 'SELECT_COLUMN';
export const selectColumn = (rowId, colIndex) => ({
  type: SELECT_COLUMN,
  payload: { rowId, colIndex },
});

export const ADD_ROW = 'ADD_ROW';
export const addRow = (rowSettings) => ({
  type: ADD_ROW,
  payload: { ...rowSettings },
});

export const DELETE_ROW = 'DELETE_ROW';
export const deleteRow = (rowId) => ({ type: DELETE_ROW, payload: { rowId } });

export const CLEAR_ROWS = 'CLEAR_ROWS';
export const clearRows = () => ({ type: CLEAR_ROWS });

export const TOGGLE_ROW_INDENTATION = 'TOGGLE_ROW_INDENTATION';
export const toggleRowIndentation = (rowId) => ({
  type: TOGGLE_ROW_INDENTATION,
  payload: { rowId },
});

export const SET_DOCUMENT_ROW_PLACEHOLDERS_GENERATED =
  'SET_DOCUMENT_ROW_PLACEHOLDERS_GENERATED';
export const setDocumentRowPlaceholdersGenerated = () => ({
  type: SET_DOCUMENT_ROW_PLACEHOLDERS_GENERATED,
  payload: { value: true },
});

export const UPDATE_ROW_FORMAT_ERROR = 'UPDATE_ROW_FORMAT_ERROR';
export const updateRowFormatError = debounce(
  100,
  (dispatch, rowId, format, generationFormat) => {
    // right now we only validate RTF format
    if (generationFormat !== 'rtf') {
      return;
    }

    const errors = validateRtfRow(format);

    dispatch({
      type: UPDATE_ROW_FORMAT_ERROR,
      payload: {
        rowId,
        errors,
      },
    });
  }
);

export const UPDATE_ROW_FORMAT = 'UPDATE_ROW_FORMAT';
export const updateRowFormat = (rowId, format) => (dispatch, getState) => {
  const generationFormat = getFormat(getState());

  updateRowFormatError(dispatch, rowId, format, generationFormat);

  dispatch({
    type: UPDATE_ROW_FORMAT,
    payload: {
      rowId,
      format,
    },
  });
};

export const SET_BUILDER_TAB = 'SET_BUILDER_TAB';
export const setBuilderTab = (tab) => ({
  type: SET_BUILDER_TAB,
  payload: { tab },
});

export const RESET = 'RESET';
export const onReset = () => ({ type: 'RESET' });

export const PURGE = 'PURGE';
export const purge = () => ({ type: 'PURGE' });

export const CLEAR_SETTINGS_ERROR = 'CLEAR_SETTINGS_ERROR';
export const clearSettingsError = () => ({ type: CLEAR_SETTINGS_ERROR });

export const ERROR_PARSING_SETTINGS = 'ERROR_PARSING_SETTINGS';
export const errorParsingSettings = (error) => ({
  type: ERROR_PARSING_SETTINGS,
  payload: {
    error,
  },
});

export const SET_SAVED_SETTINGS = 'SET_SAVED_SETTINGS';
export const setSavedSettings = (settings) => ({
  type: SET_SAVED_SETTINGS,
  payload: { ...settings },
});

export const processSettings = (settingsStr) => (dispatch) => {
  dispatch(clearSettingsError());

  try {
    const settings = JSON.parse(settingsStr);

    // TODO The validation is totally feeble here. Better to define a schema for the settings and validate against that

    if (settings.rows && Array.isArray(settings.rows)) {
      dispatch(clearRows());
      settings.rows.forEach((row) => {
        if (
          !row.hasOwnProperty('colIndex') ||
          !row.hasOwnProperty('indent') ||
          !row.hasOwnProperty('format')
        ) {
          return;
        }
        if (row.indent !== true && row.indent !== false) {
          return;
        }
        dispatch(
          addRow({
            colIndex: row.colIndex,
            indent: row.indent,
            format: row.format,
            settings: row.settings,
            arbitraryRegex: row.arbitraryRegex,
          })
        );
      });
    }

    if (
      settings.format &&
      ['html', 'rtf', 'text'].indexOf(settings.format) !== -1
    ) {
      dispatch(updateSetting('format', settings.format));
    }
    if (settings.textIndentNumSpaces) {
      dispatch(
        updateSetting('textIndentNumSpaces', settings.textIndentNumSpaces)
      );
    }
    if (settings.htmlIndentWidth) {
      dispatch(updateSetting('htmlIndentWidth', settings.htmlIndentWidth));
    }
    if (settings.rowClassPrefix) {
      dispatch(updateSetting('rowClassPrefix', settings.rowClassPrefix));
    }

    dispatch(closeApplySettingsDialog());

    showNotification('Done!', 'Your settings have been applied.');
  } catch (e) {
    dispatch(errorParsingSettings(e.message));
  }
};

export const OPEN_APPLY_SETTINGS_DIALOG = 'OPEN_APPLY_SETTINGS_DIALOG';
export const openApplySettingsDialog = () => ({
  type: OPEN_APPLY_SETTINGS_DIALOG,
});

export const CLOSE_APPLY_SETTINGS_DIALOG = 'CLOSE_APPLY_SETTINGS_DIALOG';
export const closeApplySettingsDialog = () => ({
  type: CLOSE_APPLY_SETTINGS_DIALOG,
});

export const OPEN_ROW_SETTINGS_DIALOG = 'OPEN_ROW_SETTINGS_DIALOG';
export const openRowSettingsDialog = (rowId) => ({
  type: OPEN_ROW_SETTINGS_DIALOG,
  payload: { rowId },
});

export const CLOSE_ROW_SETTINGS_DIALOG = 'CLOSE_ROW_SETTINGS_DIALOG';
export const closeRowSettingsDialog = () => ({
  type: CLOSE_ROW_SETTINGS_DIALOG,
});

export const UPDATE_ROW_SETTINGS = 'UPDATE_ROW_SETTINGS';
export const updateRowSettings = (settings) => ({
  type: UPDATE_ROW_SETTINGS,
  payload: { settings },
});

export const UPDATE_SETTING = 'UPDATE_SETTING';
export const updateSetting = (setting, value) => ({
  type: UPDATE_SETTING,
  payload: {
    setting,
    value,
  },
});

export const SET_AUTO_UPDATE = 'SET_AUTO_UPDATE';
export const setAutoUpdate = (enabled) => ({
  type: SET_AUTO_UPDATE,
  payload: { enabled },
});

export const MANUAL_UPDATE = 'MANUAL_UPDATE';
export const manualUpdateDisplay = () => ({ type: MANUAL_UPDATE });

export const UPDATE_ARBITRARY_REGEX = 'UPDATE_ARBITRARY_REGEX';
export const updateArbitraryRegex = (regex) => ({
  type: UPDATE_ARBITRARY_REGEX,
  payload: { regex },
});
