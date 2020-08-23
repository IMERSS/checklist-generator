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

export const getContent = createSelector(
    getData,
    getRowData,
    getFormat,
    getTextIndentNumSpaces,
    getHtmlIndentWidth,
    (data, rowData, format, textIndentNumSpaces, htmlIndentWidth) => (
        getBuilderContent(data, rowData, format, textIndentNumSpaces, htmlIndentWidth)
    )
);
