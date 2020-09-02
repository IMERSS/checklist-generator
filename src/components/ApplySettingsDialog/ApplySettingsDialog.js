import React from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import "./ApplySettingsDialog.scss";


const ApplySettingsDialogWrapper = ({ dialogOpen, error, openDialog, closeDialog, processSettings }) => {
    const [settings, setSettings] = React.useState('');

    const showError = () => {
        if (!error) {
            return null;
        }

        return (
            <div className="error">There was an error parsing your saved settings: {error}</div>
        );
    };

    return (
        <>
            <Button variant="outlined" size="small" color="default" onClick={openDialog}>Load Saved Settings</Button>

            <Dialog
                disableBackdropClick
                onEscapeKeyDown={closeDialog}
                aria-labelledby="confirmation-dialog-title"
                maxWidth="md"
                open={dialogOpen}
            >
                <DialogTitle id="confirmation-dialog-title">Load Saved Settings</DialogTitle>
                <DialogContent dividers>
                    <div>
                        If you have some saved settings from a previous session and wish to apply them now, paste them into
                        the field below.
                    </div>

                    {showError()}

                    <textarea
                        autoFocus
                        className="applySettingsField"
                        onChange={(e) => setSettings(e.target.value)}
                        value={settings} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => processSettings(settings)} color="primary">Process</Button>
                    <Button onClick={closeDialog} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ApplySettingsDialogWrapper;
