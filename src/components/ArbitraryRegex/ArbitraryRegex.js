import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import "./BuilderTable.scss";

export const ArtibraryRegexRable = ({ rows, onAddRow, onDeleteRow, onUpdate }) => {
    let rowElements = <p>Click the Add Row link below to add some regex rows.</p>;

    if (rows.length) {
        rowElements = rows.map(({ rowId, colIndex, format, errors, indent }, rowIndex) => {
            const rowFieldClass = (!errors || errors.length === 0) ? '' : "errorField";

            return (
                <div className="regexRow" key={rowIndex}>
                    <div className="colDropdown">
                        <select>
                        </select>
                    </div>
                    <div className="formatCol">
                        <input type="text" value={format} className={rowFieldClass} onChange={(e) => onUpdateRowFormat(rowId, e.target.value)}/>
                    </div>
                    <div className="deleteRow" onClick={() => onDeleteRow(rowId)}>
                        <DeleteIcon style={{fontSize: 20}}/>
                    </div>
                </div>
            );
        });
    }

    return (
        <>
            <div className="regexTable">
                {rowElements}
            </div>
            <span className="link" onClick={(e) => { e.preventDefault(); onAddRow(); }}>Add Row &raquo;</span>
        </>
    );
};