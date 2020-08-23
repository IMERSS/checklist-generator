import React from 'react';
import "./displayPanel.scss";

const DisplayPanel = ({ format, content }) => {
    let output = '';
    if (format === "html") {
        output = <div className="displayPanel" dangerouslySetInnerHTML={{ __html: content }} />;
    } else {
        output = <div className="displayPanel textFormat">{content}</div>;
    }

    return output;
};

export default DisplayPanel;
