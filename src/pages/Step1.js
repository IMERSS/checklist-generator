import React, { useState } from 'react';
import { parseCsv } from '../helpers/csv';

export const Step1 = () => {
    const [includesHeaderRow, setIncludesHeaderRow] = useState(false);

    const onChange = (e) => {
        const file = e.target.files[0];
        parseCsv(file);
    };

    return (
        <div>
            <h3>Step 1</h3>

            <input type="file" onChange={onChange} />

            <h4>Settings</h4>

            <p>
                <input
                    type="checkbox"
                    checked={includesHeaderRow} onChange={() => setIncludesHeaderRow(!includesHeaderRow)}
                    id="includesHeaderRow"
                />
                    <label htmlFor="includesHeaderRow">Includes table header row</label>
            </p>
        </div>
    );
};
