import { createSelector } from 'reselect';
import { getBuilderHtml, getBuilderLines } from '../../helpers/builder';

export const getData = (state) => state.settings.data;
export const getPageIndex = (state) => state.settings.pageIndex;
export const getRows = (state) => state.settings.rows;
export const getSortedRows = (state) => state.settings.sortedRows;
export const getBuilderTab = (state) => state.settings.builderTab;
export const getFormat = (state) => state.settings.format;
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
)

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

export const getHtmlContent = (data, rowData) => {
    const lines = getBuilderLines(data, rowData);
    return getBuilderHtml(lines);
};


export const getContent = createSelector(
    getData,
    getRowData,
    getHtmlContent
);
