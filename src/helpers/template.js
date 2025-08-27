import * as squirrelly from 'squirrelly';

// syntax: {{it | join(' ', ['COL1','COL10','COL11']) }}
squirrelly.filters.define('join', (rowData, joiner, placeholders) => {
  const values = [];

  placeholders.forEach((placeholder) => {
    // throw a warning when the user has specified a non-defined placeholder
    if (!rowData.hasOwnProperty(placeholder)) {
      console.warn('Unknown placeholder: ', placeholder);
    } else {
      if (rowData[placeholder]) {
        values.push(rowData[placeholder]);
      }
    }
  });

  return values.length ? values.join(joiner) : '';
});
