import React from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';


// right now this is just for RTF format, but we may well expand it for HTML too to make it a little easier to generate
// the content instead of having to provide inline styles
const RowSettingsDialog = ({ selectedColumn, onClose, open, rowSettings, updateRowSettings }) => {
    const settings = {
        rtfFontSizeUseDefault: true,
        rtfFontSize: '',
        rtfLineHeightUseDefault: true,
        rtfLineHeight: '',
        ...rowSettings
    };

    const updateSettings = (setting, value) => {
        updateRowSettings({
            ...settings,
            [setting]: value
        });
    };

    return (
        <Dialog
            disableBackdropClick
            onEscapeKeyDown={onClose}
            aria-labelledby="confirmation-dialog-title"
            maxWidth="md"
            open={open}
        >
            <DialogTitle id="confirmation-dialog-title">RTF Row Settings: <i>{selectedColumn}</i></DialogTitle>
            <DialogContent dividers>
                <div style={{ marginBottom: 10 }}>
                    To reduce the amount of manual customization of the generated RTF content, you have the option to
                    define a few styles here for this particular row.
                </div>

                <div className="builderSettings">
                    <div>
                        <div className="settingsCol1">
                            Font size
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="fontSizeDefault"
                                checked={settings.rtfFontSizeUseDefault}
                                onChange={() => updateSettings('rtfFontSizeUseDefault', true)} />
                            <label htmlFor="fontSizeDefault">Default</label>
                            <input
                                type="radio"
                                id="fontSizeCustom"
                                checked={!settings.rtfFontSizeUseDefault}
                                onChange={() => updateSettings('rtfFontSizeUseDefault', false)} />
                            <label htmlFor="fontSizeCustom">Custom: </label>
                            <input
                                type="number"
                                value={settings.rtfFontSize}
                                style={{ width: 40 }}
                                disabled={settings.rtfFontSizeUseDefault}
                                onChange={(e) => updateSettings('rtfFontSize', e.target.value)} /> pt
                        </div>
                    </div>
                    <div>
                        <div className="settingsCol1">
                            Line height
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="lineHeightDefault"
                                checked={settings.rtfLineHeightUseDefault}
                                onChange={() => updateSettings('rtfLineHeightUseDefault', true)} />
                            <label htmlFor="lineHeightDefault">Default</label>
                            <input
                                type="radio"
                                id="lineHeightCustom"
                                checked={!settings.rtfLineHeightUseDefault}
                                onChange={() => updateSettings('rtfLineHeightUseDefault', false)} />
                            <label htmlFor="lineHeightCustom">Custom: </label>
                            <input
                                type="number"
                                value={settings.rtfLineHeight}
                                checked={!settings.rtfLineHeightUseDefault}
                                style={{ width: 40 }}
                                onChange={(e) => updateSettings('rtfLineHeight', e.target.value)} />                        </div>
                    </div>
                </div>

                <h3>Arbitrary regex</h3>

                <p>
                    This section is super technical, apologies. What this lets you do is run arbitrary rules on the
                    placeholders used in this row, to make whatever conversions you want.
                </p>

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default RowSettingsDialog;
