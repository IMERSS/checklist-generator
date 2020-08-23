import React from 'react';
import Button from '@material-ui/core/Button';

export const Step1 = ({ onNext }) => {
    return (
        <div>
            <h1>Welcome!</h1>

            <div className="introPanel">
                <div>
                    <p>
                        This is a simple application that takes a CSV file that looks like this...
                    </p>
                    <img src="./table.png" width={415} />
                </div>
                <div>
                    <p>
                        and converts it to a checklist that looks like this.
                    </p>
                    <img src="./checklist.png" width={230} />
                </div>
            </div>

            <h2>Features</h2>

            <ul>
                <li>Will work on any CSV content that has the same format as shown above, where a column has a repeated vale for all children.</li>
                <li>Lets you generate HTML or plain text checklists.</li>
                <li>Allows you to extract only the data you want to present.</li>
                <li>Uses a templating language for generating the content, so you can do simple logic to output different row values based on your data set.</li>
                <li>Stores your settings and data as you progress, so you won't lose anything if you accidentally navigate away.</li>
            </ul>

            <Button variant="outlined" size="small" color="primary" onClick={onNext}>Get Started &raquo;</Button>
        </div>
    );
};
