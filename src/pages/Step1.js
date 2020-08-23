import React from 'react';
import Button from '@material-ui/core/Button';

export const Step1 = ({ onNext }) => (
    <div>
        <h1>Checklist Generator</h1>

        <div className="introPanel">
            <div>
                <p>
                    This is a simple, free online tool that <i>takes a CSV file that looks like this...</i>
                </p>
                <img src="./table.png" width={415} height={252} alt="Original CSV table format" />
            </div>
            <div>
                <p>
                    and <i>converts it to a checklist that looks like this</i>...
                </p>
                <img src="./checklist.png" width={230} height={420} alt="Generated checklist" />
            </div>
        </div>

        <h2>Features</h2>

        <ul>
            <li>Works on any CSV content that has the same format as shown above, where a column has a repeated value for all children.</li>
            <li>Lets you generate HTML or plain text checklists.</li>
            <li>Allows you to extract only the data you want to present.</li>
            <li>Uses a templating language for generating the content, so you can apply logic to output different row values based on your data set,
            as well as format each row according to whatever rules you want.</li>
            <li>Stores your settings and data as you progress, so you won't lose anything if you accidentally navigate away.</li>
        </ul>

        <Button variant="outlined" size="small" color="primary" onClick={onNext}>Get Started &raquo;</Button>
    </div>
);
