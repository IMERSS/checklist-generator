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
            converted to the values from your spreadsheet for that particular row. Here's a few tips:
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

        <h2>Display Panel</h2>

        <p>
            The purpose of the display panel is to give you an idea of what you're generating. But to emphasize: it's
            <i>merely an approximation</i> of what you're generating. HTML will look different in whatever site you
            use it, and RTF content will look different because it's being used in rich text editors
        </p>
        <p>
            The <b>Auto-update display panel</b> option is checked by default. Any time you add rows, edit them or
            change the default settings, the panel will automatically refresh. But you may find this is rather slow
            depending on the size of your data set and whatever settings you provide. As such, you have the option of
            disabling it and just manually updating it. Note: the <b>RTF</b> format is very time consuming to regenerate,
            so the auto-update feature is unavailable.
        </p>

	    <h3>Styling - HTML & RTF</h3>

	    <p>
		    If you're generating an HTML or RTF checklist you can style the content (plain text is just plain text!).
		    For HTML, enter whatever HTML content you want around the placeholders. For RTF, you have the the following
		    options available. If you enter these HTML tags they will be converted to their RTF equivalents:
	    </p>

	    <ul>
		    <li>
			    <b>bold</b> ({'<b>'}),
		    </li>
		    <li>
		        <b>italic</b> ({'<i>'})
		    </li>
		    <li>
		        <b>underline</b> ({'<u>'})
		    </li>
		    <li>
			    <b>line breaks</b> ({'<br>'}).
		    </li>
		    <li>
			    <b>font</b>
		    </li>
	    </ul>
    </>
);

export default Help;
