import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import ColumnDropdown from '../ColumnDropdown/ColumnDropdown.container';
import DisplayPanel from '../DisplayPanel/DisplayPanel.container';
import RowSettingsDialog from "../RowSettingsDialog/RowSettingsDialog.container";
import "./BuilderTable.scss";

export const BuilderTable = ({ format, rows, onAddRow, onDeleteRow, onSelectColumn, onToggleRowIndentation,
    onUpdateRowFormat, openRowSettingsDialog }) => {

    let rowElements = <p>Click the Add Row link below to start building your checklist.</p>;

    const getSettingsCol = (rowId) => {
        if (format === 'rtf') {
            return (
                <div className="rowSettings" onClick={() => openRowSettingsDialog(rowId)}>
                    <SettingsIcon style={{ fontSize: 20 }} />
                </div>
            );
        }
    };

    if (rows.length) {
        rowElements = rows.map(({ rowId, colIndex, format, errors, indent }, rowIndex) => {
            const rowFieldClass = (!errors || errors.length === 0) ? '' : "errorField";

            return (
                <div className="builderRow" key={rowIndex}>
                    <div className="colDropdown">
                        <ColumnDropdown
                            value={colIndex}
                            onChange={(columnIndex) => onSelectColumn(rowId, columnIndex)}
                        />
                    </div>
                    <div className="indentCol">
                        <input type="checkbox" checked={indent} onChange={() => onToggleRowIndentation(rowId)}
                               id={`${rowId}-indent`} />
                        <label htmlFor={`${rowId}-indent`}>Indent</label>
                    </div>
                    <div className="formatCol">
                        <input type="text" value={format} className={rowFieldClass} onChange={(e) => onUpdateRowFormat(rowId, e.target.value)}/>
                    </div>
                    {getSettingsCol(rowId)}
                    <div className="deleteRow" onClick={() => onDeleteRow(rowId)}>
                        <DeleteIcon style={{fontSize: 20}}/>
                    </div>
                </div>
            );
        });
    }

    return (
        <>
            <div className="builderTable">
                {rowElements}
            </div>
            <span className="link" onClick={(e) => { e.preventDefault(); onAddRow(); }}>Add Row &raquo;</span>

            <DisplayPanel />
            <RowSettingsDialog />
        </>
    );
};