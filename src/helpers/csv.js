import Papa from 'papaparse';

export const parseCsv = (file) => {
    Papa.parse(file, {
        complete: (data) => {
            console.log(data);
        }
    });
};
