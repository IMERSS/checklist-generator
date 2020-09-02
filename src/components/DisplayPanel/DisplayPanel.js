import React from 'react';
import "./displayPanel.scss";

const DisplayPanel = ({ format, content }) => {
    let output = '';
    if (format === 'html' || format === 'rtf') {
        let classes = 'displayPanel';
        if (format === 'rtf') {
            classes += ' rtfFormat';
        }
        output = <div className={classes} dangerouslySetInnerHTML={{ __html: content }} />;
    } else {
        output = <div className="displayPanel textFormat">{content}</div>;
    }

    return output;
};

export default DisplayPanel;
