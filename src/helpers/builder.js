export const getBuilderLines = (data, rowConfig) => {
    const lastSeenColValues = [];
    const lines = [];

    for (let i=1; i<data.length; i++) {
        let currIndent = 0;
        rowConfig.forEach((config) => {
            const { colIndex, indent } = config; // format
            const colValue = data[i][colIndex];

            currIndent = (indent) ? currIndent + 1 : currIndent;

            // if we've already output this item, don't add it again
            if (lastSeenColValues[colIndex] === colValue) {
                return;
            }

            lines.push({
                value: colValue, // TODO: custom format
                indent: currIndent
            });

            lastSeenColValues[colIndex] = colValue;
        });
    }

    return lines;
};

// needs to be passed all cols
export const getFormattedCell = (value, format) => {

};

export const getBuilderHtml = (lines, format = "html") => {
    let html = '';
    lines.forEach(({ value, indent}) => {
        html += `<div>${'&nbsp'.repeat((indent-1)*4) + value}</div>`;
    });
    return html;
};
