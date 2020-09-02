import React from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import CopyToClipboardBtn from "../CopyToClipboard/CopyToClipboardBtn";
import "./SettingsDialog.scss";


const SettingsDialog = ({ onClose, open, settingsStr }) => (
    <Dialog
        disableBackdropClick
        onEscapeKeyDown={onClose}
        aria-labelledby="confirmation-dialog-title"
        maxWidth="md"
        open={open}
    >
        <DialogTitle id="confirmation-dialog-title">Save Settings</DialogTitle>
        <DialogContent dividers>
            <div>
                This application stores your latest settings in your browser's memory (local storage), so when you return
                to this site they'll all be remembered. But what if you revisit this site from a different browser or
                computer? Or what if your browser's memory gets wiped? Tragedy! Your settings will be lost and you'll
                need to configure it all over again. The section below generates a simple JSON formatted version of the
                settings you've entered in the UI. You may want to back these up somewhere. When you come back, you can
                optionally re-enter them on Step 3.
            </div>

            <div className="settingsDisplay">
                {settingsStr}
            </div>

            <CopyToClipboardBtn content={settingsStr} />
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={onClose} color="primary">Close</Button>
        </DialogActions>
    </Dialog>
);

export default SettingsDialog;
