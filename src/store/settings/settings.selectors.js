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

export const getPreviewContent = createSelector(
    getData,
    getRowData,
    getFormat,
    getTextIndentNumSpaces,
    getHtmlIndentWidth,
    (data, rowData, format, textIndentNumSpaces, htmlIndentWidth) => (
        getBuilderContent(data, rowData, format, textIndentNumSpaces, htmlIndentWidth)
    )
);

export const getGeneratedContent = createSelector(
    getData,
    getRowData,
    getFormat,
    getTextIndentNumSpaces,
    getHtmlIndentWidth,
    getRowClassPrefix,
    (data, rowData, format, textIndentNumSpaces, htmlIndentWidth, rowClassPrefix) => (
        getBuilderContent(data, rowData, format, textIndentNumSpaces, htmlIndentWidth, rowClassPrefix, false)
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
