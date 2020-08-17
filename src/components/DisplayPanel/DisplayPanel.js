import React from 'react';
import "./displayPanel.scss";

const DisplayPanel = ({ content }) => {
    return (
        <div className="displayPanel">
            {content}
        </div>
    )
};

export default DisplayPanel;
