import * as squirrelly from 'squirrelly';

export const getBuilderLines = (data, rowConfig) => {
    const lastSeenColValues = [];
    const lines = [];

    for (let i=1; i<data.length; i++) {
        let currIndent = 0;
        rowConfig.forEach((config) => {
            const { colIndex, format, indent } = config; // format
            const colValue = data[i][colIndex];

            currIndent = (indent) ? currIndent + 1 : currIndent;

            // if we've already output this item, don't add it again
            if (lastSeenColValues[colIndex] === colValue) {
                return;
            }

            const placeholders = getRowPlaceholders(data[i]);

            lines.push({
                value: getFormattedCell(format, { VALUE: colValue, ...placeholders }),
                indent: currIndent
            });

            lastSeenColValues[colIndex] = colValue;
        });
    }

    return lines;
};

export const getRowPlaceholders = (row) => {
    const placeholders = {};
    row.forEach((i, index) => {
        placeholders['COL' + (index+1)] = i;
    });

    return placeholders;
};

// needs to be passed all col data
export const getFormattedCell = (format, placeholders) => {
    let value = '<span class="invalidRow">invalid syntax for this row</span>';
    try {
        value = squirrelly.render(format, placeholders);
    } catch (e) {
        console.log(e);
    }
    return value;
};

export const getBuilderHtml = (lines, format = "html") => {
    let html = '';
    lines.forEach(({ value, indent}) => {
        html += `<div>${'&nbsp'.repeat((indent-1)*4) + value}</div>`;
    });
    return html;
};
