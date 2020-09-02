import * as squirrelly from 'squirrelly';
import Parser from 'html-tokenizer/parser';

// helper method to parse the CSV data (in JSON format) and return an array of rows to be output
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

export const convertKnownHtmlCharsToRtf = (content) => {
    const data = Parser.parse(content);

    let rtfStr = '';
    for (const token of data) {
        if (token.type === 'open') {
            if (token.name === 'b') {
                rtfStr += '{\\b ';
            }
            if (token.name === 'i') {
                rtfStr += '{\\i ';
            }
            if (token.name === 'u') {
                rtfStr += '{\\ul ';
            }
            if (token.name === 'br') {
                rtfStr += '\\line';
            }
        }

        if (token.type === 'close') {
            if (token.name === 'i' || token.name === 'b' || token.name === 'u') {
                rtfStr += '}';
            }
        }

        if (token.type === 'text') {
            rtfStr += token.text;
        }
    }

    return rtfStr;
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
            if (format === "html" || format === "rtf") {
                const pxWidth = (indent-1) * htmlIndent;
                content += `<div style="padding-left: ${pxWidth}px">${value}</div>`;
            } else {
                content += ' '.repeat((indent-1)*textSpaces) + value + '\n';
            }
        });

    } else {
        lines.forEach(({ value, colIndex, indent }) => {
            if (format === "html") {
                const cls = `${rowClassPrefix}${colIndex + 1} ${rowClassPrefix}indent-${indent}`;
                content += `<div class="${cls}">${value}</div>\n`;
            } else if (format === "rtf") {
                content += '{\\pard ' + (' '.repeat((indent-1)*textSpaces) + convertKnownHtmlCharsToRtf(value)) + ' \\par}\n';
            } else {
                content += ' '.repeat((indent-1)*textSpaces) + value + '\n';
            }
        });

        if (format === "rtf") {
            // content = `{\\pard\n${content}\\par}\n`;
            content = `{\\rtf1\\ansi\\deff0\\fs24\n${content}\n}\n`;
        }
    }

    return content;
};
