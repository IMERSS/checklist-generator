import React from 'react';
import Button from "@material-ui/core/Button";
import "./displayPanel.scss";

const DisplayPanel = ({ format, autoUpdate, setAutoUpdate, manualUpdateDisplay, content }) => {
    let panel;
    const isRtf = format === 'rtf';

    if (format === 'html' || isRtf) {
        let classes = 'displayPanel';
        if (format === 'rtf') {
            classes += ' rtfFormat';
        }
        panel = <div className={classes} dangerouslySetInnerHTML={{ __html: content }} />;
    } else {
        panel = <div className="displayPanel textFormat">{content}</div>;
    }

    let autoUpdatePanelClasses = 'autoUpdatePanel';

    return (
        <>
            <div className={autoUpdatePanelClasses}>
                <span>
                    <input
                        type="checkbox"
                        checked={autoUpdate}
                        id="toggleAutoUpdate"
                        onChange={() => setAutoUpdate(!autoUpdate)}
                    />
                    <label htmlFor="toggleAutoUpdate">Auto-update display panel</label>
                </span>
                <Button
                    variant="contained"
                    disableElevation
                    size="small"
                    onClick={() => manualUpdateDisplay()}>Update</Button>
            </div>
            {panel}
        </>
    );
};

export default DisplayPanel;
