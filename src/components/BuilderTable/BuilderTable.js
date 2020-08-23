import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ColumnDropdown from '../ColumnDropdown/ColumnDropdown.container';
import DisplayPanel from '../DisplayPanel/DisplayPanel.container';
import "./BuilderTable.scss";

const TabPanel = ({ children, value, index }) => {
    if (value !== index) {
        return null;
    }

    return (
        <div style={{ padding: "20px 0 0" }}>
            {children}
        </div>
    );
}

export const BuilderTable = ({ builderTab, rows, onAddRow, onDeleteRow, onSelectColumn, onToggleRowIndentation,
    onUpdateRowFormat, setBuilderTab }) => {
    let rowElements = <p>No rows.</p>;

    if (rows.length) {
        rowElements = rows.map(({ rowId, colIndex, format, indent }, rowIndex) => (
            <div className="builderRow" key={rowIndex}>
                <div className="colDropdown">
                    <ColumnDropdown
                        value={colIndex}
                        onChange={(columnIndex) => onSelectColumn(rowId, columnIndex)}
                    />
                </div>
                <div className="indentCol">
                    <input type="checkbox" checked={indent} onChange={() => onToggleRowIndentation(rowId)} id={`${rowId}-indent`} />
                    <label htmlFor={`${rowId}-indent`}>Indent</label>
                </div>
                <div className="formatCol">
                    <input type="text" value={format} onChange={(e) => onUpdateRowFormat(rowId, e.target.value)}/>
                </div>
                <div className="deleteRow" onClick={() => onDeleteRow(rowId)}>
                    <DeleteIcon style={{ fontSize: 20 }} />
                </div>
            </div>
        ));
    }

    return (
        <>
            <Tabs
                value={builderTab}
                indicatorColor="primary"
                textColor="primary"
                onChange={(e, newValue) => setBuilderTab(newValue)}
                aria-label="disabled tabs example"
            >
                <Tab label="Build" />
                <Tab label="Settings" />
                <Tab label="Help" />
            </Tabs>
            <TabPanel value={builderTab} index={0}>
                <div className="builderTable">
                    {rowElements}
                </div>
                <a href="#" className="addRowLink" onClick={(e) => { e.preventDefault(); onAddRow(); }}>Add Row &raquo;</a>

                <DisplayPanel />
            </TabPanel>
            <TabPanel value={builderTab} index={1}>
                ...
            </TabPanel>
            <TabPanel value={builderTab} index={2}>
                <div>
                    This page lets you build your checklist by choosing specific columns out of your CSV file to be
                    displayed. You have the choice of indenting each column (using the indentation style you specify
                    on the Settings tab) and customizing the content of the rows however you want.
                </div>

                <h2>Placeholders</h2>
                <p>
                    This application uses <a href="https://squirrelly.js.org/" target="_blank">SquirrellyJS</a> as the
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
            </TabPanel>
        </>
    );
};