import Papa from 'papaparse';

export const parseCsv = (file) => {
  return new Promise((resolve) => {
    Papa.parse(file, {
      complete: (data) => resolve(data),
    });
  });
};
