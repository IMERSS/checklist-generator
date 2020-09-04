import { createSelector } from 'reselect';
import { getBuilderContent } from '../../helpers/builder';

export const getData = (state) => state.settings.data;
export const getUploadedFilename = (state) => state.settings.uploadedFilename;
export const getPageIndex = (state) => state.settings.pageIndex;
export const getRows = (state) => state.settings.rows;
export const getSortedRows = (state) => state.settings.sortedRows;
export const getBuilderTab = (state) => state.settings.builderTab;
export const getFormat = (state) => state.settings.format;
export const getTextIndentNumSpaces = (state) => state.settings.textIndentNumSpaces;
export const getHtmlIndentWidth = (state) => state.settings.htmlIndentWidth;
export const getRowClassPrefix = (state) => state.settings.rowClassPrefix;
export const getRtfDefaultFontSize = (state) => state.settings.rtfDefaultFontSize;
export const getRtfDefaultLineHeight = (state) => state.settings.rtfDefaultLineHeight;
export const getSettingsError = (state) => state.settings.loadSettingsError;
export const getEditingRowId = (state) => state.settings.editingRowId;
export const isApplySettingsDialogOpen = (state) => state.settings.applySettingsDialogOpen;
export const isRowSettingsDialogOpen = (state) => state.settings.rowSettingsDialogOpen;
export const shouldAutoUpdate = (state) => state.settings.autoUpdate;
export const getRegenerationCount = (state) => state.settings.regenerationCount;

export const getFormatLabel = createSelector(
    getFormat,
    (format) => {
        const map = {
            html: 'HTML',
            rtf: 'RTF',
            text: 'Text'
        };
        return map[format];
    }
)
export const getRowData = createSelector(
    getSortedRows,
    getRows,
    (sortedRows, rows) => {
        return sortedRows.map((rowId) => {
            return {
                ...rows[rowId],
                rowId
            };
        });
    }
);

export const hasUploadedData = createSelector(
    getData,
    (data) => data !== null
);

export const getColumns = createSelector(
    getData,
    (data) => {
        if (!data.length) {
            return [];
        }
        return data[0];
    }
);

let lastRegenerationCount;
let lastBuilderContent;
export const getPreviewContent = createSelector(
    shouldAutoUpdate,
    getRegenerationCount,
    getData,
    getRowData,
    getFormat,
    getTextIndentNumSpaces,
    getHtmlIndentWidth,
    (autoUpdate, regenerationCount, data, rowData, format, textIndentNumSpaces, htmlIndentWidth) => {
        if (!autoUpdate && regenerationCount === lastRegenerationCount && lastBuilderContent) {
            return lastBuilderContent;
        }
        lastRegenerationCount = regenerationCount;
        lastBuilderContent = getBuilderContent(true, data, rowData, format, textIndentNumSpaces, htmlIndentWidth);

        return lastBuilderContent;
    }
);

export const getGeneratedContent = createSelector(
    getData,
    getRowData,
    getFormat,
    getTextIndentNumSpaces,
    getHtmlIndentWidth,
    getRowClassPrefix,
    getRtfDefaultFontSize,
    getRtfDefaultLineHeight,
    (data, rowData, format, textIndentNumSpaces, htmlIndentWidth, rowClassPrefix, rtfDefaultFontSize, rtfDefaultLineHeight) => (
        getBuilderContent(false, data, rowData, format, textIndentNumSpaces, htmlIndentWidth, rowClassPrefix,
            rtfDefaultFontSize, rtfDefaultLineHeight)
    )
);

export const getGeneratedCss = createSelector(
    getRowData,
    getHtmlIndentWidth,
    getRowClassPrefix,
    (rowData, indentWidth, classPrefix) => {
        const lines = [];
        const indentedRows = rowData.filter(({ indent }) => indent);

        indentedRows.forEach((row, index) => {
            lines.push(`.${classPrefix}indent-${index+1} { margin-left: ${indentWidth * (index)}px; }`);
        });

        return lines.join("\n");
    }
);

// serializes all the relevant user settings into a simple JSON object for the user to save. This lets them
// re-create the same settings later on rather than rely on local storage to remember it for them. When adding node
// support this'll help as well.
export const getSettingsStr = createSelector(
    getSortedRows,
    getRows,
    getFormat,
    getTextIndentNumSpaces,
    getHtmlIndentWidth,
    getRowClassPrefix,
    (sortedRows, rows, format, textIndentNumSpaces, htmlIndentWidth, rowClassPrefix) => {
        const settings = {
            rows: [],
            format,
            textIndentNumSpaces,
            htmlIndentWidth,
            rowClassPrefix
        };
        sortedRows.forEach((rowId) => {
            settings.rows.push(rows[rowId]);
        });

        return JSON.stringify(settings, null, '\t');
    }
);

export const getRowSettings = createSelector(
    getEditingRowId,
    getRows,
    (editingRowId, rows) => {
        if (!editingRowId) {
            return {};
        }
        return rows[editingRowId].settings;
    }
);

export const getSelectedRowColumn = createSelector(
    getEditingRowId,
    getRows,
    getColumns,
    (editingRowId, rows, columns) => {
        if (!editingRowId) {
            return '';
        }
        return columns[rows[editingRowId].colIndex];
    }
);
