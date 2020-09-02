import * as squirrelly from 'squirrelly';
import Parser from 'html-tokenizer/parser';

// helper method to parse the CSV data (in JSON format) and return an array of rows to be output
export const getBuilderLines = (data, rowConfig, generationFormat) => {
    const lastSeenColValues = [];
    const lines = [];

    const rowPlaceholders = getDocumentRowPlaceholders();

    for (let row=1; row<data.length; row++) {
        let currIndent = 0;
        rowConfig.forEach((config) => {
            const { colIndex, format, errors, indent, settings } = config;
            const colValue = data[row][colIndex];

            currIndent = (indent) ? currIndent + 1 : currIndent;

            // if we've already output this item, don't add it again
            if (lastSeenColValues[colIndex] === colValue) {
                return;
            }

            const placeholders = rowPlaceholders[row];
            const hasErrors = errors && errors.length > 0;

            lines.push({
                colIndex,
                value: getFormattedCell(format, hasErrors, { VALUE: colValue, ...placeholders }, generationFormat),
                indent: currIndent,

                // pity... these aren't line-specific. But convenient.
                rtfFontSize: settings && settings.rtfFontSize && !settings.rtfFontSizeUseDefault ? settings.rtfFontSize : null,
                rtfLineHeight: settings && settings.rtfLineHeight ? settings.rtfLineHeight : null
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

let documentRowPlaceholders = [];
export const computeDocumentRowPlaceholders = (rows) => {
    const result = [];
    rows.forEach((row) => {
        const placeholders = {};
        row.forEach((i, index) => {
            placeholders['COL' + (index+1)] = i;
        });
        result.push(placeholders);
    });
    documentRowPlaceholders = result;
};

export const getDocumentRowPlaceholders = () => documentRowPlaceholders;

export const getFormattedCell = (format, hasError, placeholders, generationFormat) => {
    let errorStr = 'invalid syntax for this row';
    let value = generationFormat === 'html' || generationFormat === 'rtf' ? `<span class="invalidRow">${errorStr}</span>` : `--- ${errorStr} ---`;

    if (hasError) {
        return value;
    }

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

export const getBuilderContent = (isPreview, data, rowData, format, textIndentNumSpaces, htmlIndentWidth, rowClassPrefix,
    rtfDefaultFontSize, rtfDefaultLineHeight) => {
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
        lines.forEach(({ value, colIndex, indent, rtfFontSize, rtfLineHeight }) => {
            if (format === "html") {
                const cls = `${rowClassPrefix}${colIndex + 1} ${rowClassPrefix}indent-${indent}`;
                content += `<div class="${cls}">${value}</div>\n`;
            } else if (format === "rtf") {
                const fontSize = (rtfFontSize) ? `\\fs${rtfFontSize*2}` : '';
                const lineHeight = rtfLineHeight ? rtfLineHeight : rtfDefaultLineHeight;

                content += `{\\pard${fontSize}\\sa${lineHeight} ` + (' '.repeat((indent-1)*textSpaces) + convertKnownHtmlCharsToRtf(value)) + ' \\par}\n';
            } else {
                content += ' '.repeat((indent-1)*textSpaces) + value + '\n';
            }
        });

        if (format === "rtf") {
            // RTF font sizes are "half-points", so we double them
            content = `{\\rtf1\\ansi\\deff0\\fs${rtfDefaultFontSize*2}\n${content}\n}\n`;
        }
    }

    return content;
};


export const validateRtfRow = (rowString) => {
    const data = Parser.parse(rowString);

    const invalidTags = [];
    const validTags = ['b', 'i', 'u', 'br'];

    for (const token of data) {
        if (token.type === 'open') {
            if (validTags.indexOf(token.name) === -1) {
                invalidTags.push(token.name);
            }
        }
    }

    return invalidTags;
};
