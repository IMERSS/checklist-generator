import React from 'react';
import "./displayPanel.scss";

const DisplayPanel = ({ content }) => {
    return (
        <div className="displayPanel" dangerouslySetInnerHTML={{ __html: content }} />
    )
};

export default DisplayPanel;
