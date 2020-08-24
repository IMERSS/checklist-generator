import * as squirrelly from 'squirrelly';

export const getBuilderLines = (data, rowConfig, generationFormat) => {
    const lastSeenColValues = [];
    const lines = [];

    for (let row=1; row<data.length; row++) {
        let currIndent = 0;
        rowConfig.forEach((config) => {
            const { colIndex, format, indent } = config; // format
            const colValue = data[row][colIndex];

            currIndent = (indent) ? currIndent + 1 : currIndent;

            // if we've already output this item, don't add it again
            if (lastSeenColValues[colIndex] === colValue) {
                return;
            }

            const placeholders = getRowPlaceholders(data[row]);

            lines.push({
                colIndex,
                value: getFormattedCell(format, { VALUE: colValue, ...placeholders }, generationFormat),
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

export const getFormattedCell = (format, placeholders, generationFormat) => {
    let errorStr = 'invalid syntax for this row';
    let value = generationFormat === 'html' ? `<span class="invalidRow">${errorStr}</span>` : `--- ${errorStr} ---`;
    try {
        value = squirrelly.render(format, placeholders);
    } catch (e) {
        // console.log("error parsing: ", e);
    }
    return value;
};

export const getBuilderContent = (data, rowData, format, textIndentNumSpaces, htmlIndentWidth, rowClassPrefix, isPreview = true) => {
    const lines = getBuilderLines(data, rowData, format);
    let content = '';

    const textSpaces = parseInt(textIndentNumSpaces || 0, 10);
    const htmlIndent = parseInt(htmlIndentWidth || 0, 10);

    // a little inelegant, but for previewing we just generate HTML with the indentation hardcoded. For the actual
    // generation we generate the final markup with the appropriate CSS separately
    if (isPreview) {
        lines.forEach(({ value, indent}) => {
            if (format === "html") {
                const pxWidth = (indent-1) * htmlIndent;
                content += `<div style="padding-left: ${pxWidth}px">${value}</div>`;
            } else {
                content += ' '.repeat((indent-1)*textSpaces) + value + '\n';
            }
        });
    } else {
        lines.forEach(({ value, colIndex, indent }) => {
            if (format === "html") {
                const cls = `${rowClassPrefix}${colIndex+1} ${rowClassPrefix}indent-${indent}`;
                content += `<div class="${cls}">${value}</div>\n`;
            } else {
                content += ' '.repeat((indent-1)*textSpaces) + value + '\n';
            }
        });
    }

    return content;
};
