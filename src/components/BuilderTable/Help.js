import React from 'react';

const Help = () => (
    <>
        <div>
            This page lets you build your checklist by choosing specific columns out of your CSV file to be
            displayed. You have the choice of indenting each column (using the indentation style you specify
            on the Settings tab) and customizing the content of the rows however you want.
        </div>

        <h2>Placeholders</h2>
        <p>
            This application uses <a href="https://squirrelly.js.org/" target="_blank" rel="noopener noreferrer">SquirrellyJS</a> as the
            template engine. That's what allows you to enter <i>placeholders</i> in the row fields, which get
            converted to the values from your spreadsheet. Here's a few tips:
        </p>

        <ul>
            <li><b>{'{{it.VALUE}}'}</b> outputs the value of whatever column you've selected in the dropdown for that row.</li>
            <li><b>{'{{it.COL1}}, {{it.COL2}}, ...'}</b> outputs the value of values from <i>any</i> column from
                your spreadsheet for that particular row. For convenience, the dropdown lists the column numbers
                in parentheses, so they're easy to find.
            </li>
            <li>If you want to use simple boolean logic, like only output a value from another field if it has a value,
                you can write: <b>{'{{@if(it.COL5)}}{{it.COL5}}{{/if}}'}</b>. Bit of a mouthful, but that's how the template
                language works.</li>
        </ul>
    </>
);

export default Help;