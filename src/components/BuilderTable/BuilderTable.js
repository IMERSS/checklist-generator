import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import ColumnDropdown from '../ColumnDropdown/ColumnDropdown.container';
import DisplayPanel from '../DisplayPanel/DisplayPanel.container';
import "./BuilderTable.scss";

export const BuilderTable = ({ rows, onAddRow, onDeleteRow, onSelectColumn, onToggleRowIndentation, onUpdateRowFormat }) => {
    let rowElements = <p>Click the Add Row link below to start building your checklist.</p>;

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
            <div className="builderTable">
                {rowElements}
            </div>
            <span className="link" onClick={(e) => { e.preventDefault(); onAddRow(); }}>Add Row &raquo;</span>

            <DisplayPanel />
        </>
    );
};