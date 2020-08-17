import { createSelector } from 'reselect';

export const getData = (state) => state.settings.data;
export const getPageIndex = (state) => state.settings.pageIndex;
export const getRows = (state) => state.settings.rows;
export const getSortedRows = (state) => state.settings.sortedRows;

export const getRowData = createSelector(
    getSortedRows,
    getRows,
    (sortedRows, rows) => {
        return sortedRows.map((rowId) => ({
            ...rows[rowId],
            rowId
        }))
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

export const getContent = createSelector(
    getData,
    getRowData,
    (data, rowData) => {
        console.log(rowData);

        return '';
    }
);
