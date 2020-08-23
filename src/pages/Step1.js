import React from 'react';
import Button from '@material-ui/core/Button';

export const Step1 = ({ onNext }) => {
    return (
        <div>
            <h1>Welcome!</h1>

            <p>
                This is a simple application that takes a CSV file that looks like this.
            </p>

            <p>
                and converts it to a checklist.
            </p>

            <p>
                Our primary use-case is for presenting taxonomical data in a human-friendly format, but it will work
                on any data set.
            </p>

            <h2>Features</h2>

            <ul>
                <li>Lets you generate HTML or plain text checklists</li>
                <li>Allows you to extract only the data you want to present</li>
                <li>Uses a templating language for generating the content, so you can do simple logic to output different values based on your data set</li>
                <li>Stores your settings and data as you progress, so you won't lose anything if you accidentally navigate away</li>
            </ul>

            <Button variant="outlined" size="small" color="primary" onClick={onNext}>Continue &raquo;</Button>
        </div>
    );
};
