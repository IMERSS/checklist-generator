import React from 'react';
import Button from '@material-ui/core/Button';
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

export const BuilderTable = ({ rows, onAddRow, onDeleteRow, onSelectColumn, onToggleRowIndentation, onUpdateRowFormat }) => {
    const [tabIndex, setTabIndex] = React.useState(0);

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
                value={tabIndex}
                indicatorColor="primary"
                textColor="primary"
                onChange={(e, newValue) => setTabIndex(newValue)}
                aria-label="disabled tabs example"
            >
                <Tab label="Build" />
                <Tab label="Settings" />
                <Tab label="Help" />
            </Tabs>
            <TabPanel value={tabIndex} index={0}>
                <div className="builderTable">
                    {rowElements}
                </div>
                <Button variant="outlined" size="small" onClick={onAddRow} style={{ marginRight: 10 }}>Add Row &raquo;</Button>

                <DisplayPanel />
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
                ...
            </TabPanel>
            <TabPanel value={tabIndex} index={2}>
                ...
            </TabPanel>
        </>
    );
};