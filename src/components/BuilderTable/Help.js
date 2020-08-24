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
            <li><b>{'{{it.COL1}}, {{it.COL2}}, {{it.COL3}}, ...'}</b> outputs the value of values from <i>any</i> column from
                your spreadsheet. For convenience, the dropdown lists the column numbers in parentheses, so they're easy to find.
            </li>
            <li>If you want to use simple boolean logic, like only output a value from another field if it has a value,
                you can write: <b>{'{{@if(it.COL5 !== "none")}}{{it.COL5}}{{/if}}'}</b>. Bit of a mouthful, but that's how the template
                language works. Welcome to programming!
            </li>
        </ul>

        <h2>Settings</h2>
        <ul>
            <li><i>Format</i>: this setting controls whether the generated output is HTML or text. HTML provides more
            option for styling, but the text option is handier if you plan on copying & pasting it into a document
            somewhere.</li>
            <li>If you're constructing an HTML checklist (see the <i>Settings</i> tab option), you can enter HTML into
                the rows to change their appearance, e.g. <b>{'<h2>{{it.VALUE}}</h2>'}</b> or {'<b>Heading here:</b> {{it.VALUE}}'}.
                But be aware that when you embed the content onto your own sites, whatever CSS is used there will be used
                to style the rows, so it won't look identical to what you see here. E.g. fonts, colours and sizes may
                differ.
            </li>
            <li>
                The <b>HTML class prefix</b> setting appears for the <i>HTML</i> format only. That applies a class to every
                row which you can use for your own styling. Values from a particular column will be given a class
                for that column, e.g. with a prefix value of <b>cg-col-</b>, you'll see <b>cg-col-5</b> in the generated
                content for all values from the 5th column. This value is also used for indentation. Depending on which
                columns you select in the builder table to be indented, they will get a <b>cg-col-indent-N</b> class
                applied. That is what allows the indentation styles to be applied.
            </li>
        </ul>
    </>
);

export default Help;