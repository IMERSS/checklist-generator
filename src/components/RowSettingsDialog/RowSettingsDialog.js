import React from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';


const RowSettingsDialog = ({ onClose, open }) => (
    <Dialog
        disableBackdropClick
        onEscapeKeyDown={onClose}
        aria-labelledby="confirmation-dialog-title"
        maxWidth="md"
        open={open}
    >
        <DialogTitle id="confirmation-dialog-title">Row Settings</DialogTitle>
        <DialogContent dividers>

            <div>
                <div className="settingsCol1">
                    Font size
                </div>
                <div>
                    <input type="number" value="" style={{ width: 40 }} />
                </div>
            </div>
            <div>
                <div className="settingsCol1">
                    Font family
                </div>
                <div>
                    <input type="number" value="" style={{ width: 40 }} />
                </div>
            </div>
            <div>
                <div className="settingsCol1">
                    Line height
                </div>
                <div>
                    <input type="number" value="" style={{ width: 40 }} />
                </div>
            </div>

        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={onClose} color="primary">Close</Button>
        </DialogActions>
    </Dialog>
);

export default RowSettingsDialog;
