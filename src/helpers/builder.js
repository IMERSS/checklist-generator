import * as squirrelly from 'squirrelly';
import Parser from 'html-tokenizer/parser';

// helper method to parse the CSV data (in JSON format) and return an array of rows to be output
export const getBuilderLines = (data, rowConfig, generationFormat) => {
  const lastSeenColValues = [];
  const lines = [];
  const numConfigRows = rowConfig.length;
  const rowPlaceholders = getDocumentRowPlaceholders();

  for (let row = 1; row < data.length; row++) {
    // see bug: https://github.com/IMERSS/checklist-generator/issues/5
    if (data[row].length === 1 && data[row][0] === '') {
      continue;
    }

    let currIndent = 0;
    let lastValueWasAlreadySeen = false;

    rowConfig.forEach((config, uiRowIndex) => {
      const { colIndex, format, errors, indent } = config;
      const colValue = data[row][colIndex];

      currIndent = indent ? currIndent + 1 : currIndent;

      // if we've already output this item, don't add it again
      if (lastSeenColValues[colIndex] === colValue) {
        lastValueWasAlreadySeen = true;
        return;
      }

      // see bug: https://github.com/IMERSS/checklist-generator/issues/2
      if (lastValueWasAlreadySeen && uiRowIndex !== 0) {
        for (let k = uiRowIndex + 1; k < numConfigRows; k++) {
          const obsoleteCacheRow = rowConfig[k].colIndex;
          lastSeenColValues[obsoleteCacheRow] = null;
        }
      }

      lastValueWasAlreadySeen = false;

      const placeholders = rowPlaceholders[row];
      const hasErrors = errors && errors.length > 0;

      lines.push({
        colIndex,
        uiRowIndex,
        value: getFormattedCell(
          format,
          hasErrors,
          { VALUE: colValue, ...placeholders },
          generationFormat
        ),
        indent: currIndent,
      });

      lastSeenColValues[colIndex] = colValue;
    });
  }

  return lines;
};

let documentRowPlaceholders = [];
export const computeDocumentRowPlaceholders = (rows) => {
  const result = [];
  rows.forEach((row) => {
    const placeholders = {};
    row.forEach((i, index) => {
      placeholders['COL' + (index + 1)] = i;
    });
    result.push(placeholders);
  });
  documentRowPlaceholders = result;
};

export const getDocumentRowPlaceholders = () => documentRowPlaceholders;

export const getFormattedCell = (
  format,
  hasError,
  placeholders,
  generationFormat
) => {
  let errorStr = 'invalid syntax for this row';
  let value =
    generationFormat === 'html' || generationFormat === 'rtf'
      ? `<span class="invalidRow">${errorStr}</span>`
      : `--- ${errorStr} ---`;

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
  let openFontTags = false;
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

      if (token.name === 'font') {
        if (token.attributes && token.attributes.size) {
          rtfStr += `{\\fs${parseInt(token.attributes.size.trim(), 10) * 2}`;
          openFontTags++;
        }
      }
      if (token.name === 'noStyle') {
        rtfStr += '{\\b0\\i0\\ul0 ';
      }
    }

    if (token.type === 'close') {
      if (token.name === 'i' || token.name === 'b' || token.name === 'u') {
        rtfStr += '}';
      }
      if (token.name === 'font' && openFontTags > 0) {
        rtfStr += '}';
        openFontTags--;
      }
      if (token.name === 'noStyle') {
        rtfStr += '}';
      }
    }

    if (token.type === 'text') {
      rtfStr += token.text;
    }
  }

  return rtfStr;
};

export const applyArbitraryRegex = (str, regex) => {
  let newStr = str;

  regex.forEach((row) => {
    if (row.regex) {
      const regex = new RegExp(row.regex);
      newStr = newStr.replace(regex, row.replacement);
    }
  });

  return newStr;
};

/**
 * colIndex: the index of the column in the original data set
 * uiRowIndex: how indented the particular entry should be.
 */
export const getBuilderContent = (
  isPreview,
  data,
  rowData,
  format,
  textIndentNumSpaces,
  htmlIndentWidth,
  rowClassPrefix,
  rtfDefaultFontSize,
  rtfDefaultLineHeight
) => {
  const lines = getBuilderLines(data, rowData, format);
  let content = '';

  const textSpaces = parseInt(textIndentNumSpaces || 0, 10);
  const htmlIndent = parseInt(htmlIndentWidth || 0, 10);

  // a little inelegant, but for previewing we just generate HTML with the indentation hardcoded. For the actual
  // generation we generate the final markup with the appropriate CSS separately
  if (isPreview) {
    lines.forEach(({ value, indent }) => {
      if (format === 'html' || format === 'rtf') {
        const pxWidth = (indent - 1) * htmlIndent;
        content += `<div style="padding-left: ${pxWidth}px">${value}</div>`;
      } else {
        content += ' '.repeat((indent - 1) * textSpaces) + value + '\n';
      }
    });
  } else {
    lines.forEach(({ value, colIndex, uiRowIndex, indent }) => {
      if (format === 'html') {
        const cls = `${rowClassPrefix}${colIndex + 1} ${rowClassPrefix}indent-${indent}`;
        content += `<div class="${cls}">${value}</div>\n`;
      } else if (format === 'rtf') {
        const lineHeight =
          rowData[uiRowIndex].settings &&
          rowData[uiRowIndex].settings.rtfLineHeight
            ? rowData[uiRowIndex].settings.rtfLineHeight
            : rtfDefaultLineHeight;

        const updatedStr = applyArbitraryRegex(
          value,
          rowData[uiRowIndex].arbitraryRegex
        );

        content +=
          `{\\pard\\sa${lineHeight} ` +
          (' '.repeat((indent - 1) * textSpaces) +
            convertKnownHtmlCharsToRtf(updatedStr)) +
          ' \\par}\n';
      } else {
        content += ' '.repeat((indent - 1) * textSpaces) + value + '\n';
      }
    });

    if (format === 'rtf') {
      // RTF font sizes are "half-points", so we double them
      content = `{\\rtf1\\ansi\\deff0\\fs${rtfDefaultFontSize * 2}\n${content}\n}\n`;
    }
  }

  return content;
};

export const validateRtfRow = (rowString) => {
  const data = Parser.parse(rowString);

  const invalidTags = [];
  const validTags = ['b', 'i', 'u', 'br', 'font', 'noStyle'];

  for (const token of data) {
    if (token.type === 'open') {
      if (validTags.indexOf(token.name) === -1) {
        invalidTags.push(token.name);
      }
    }
  }

  return invalidTags;
};

// creates a file and prompts for download
export const downloadFile = (data, filename, type) => {
  let file = new Blob([data], { type: type });
  const a = document.createElement('a');
  const url = URL.createObjectURL(file);
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  setTimeout(function () {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
};
