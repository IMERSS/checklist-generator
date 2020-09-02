import React from 'react';
import { store } from 'react-notifications-component';
import Button from '@material-ui/core/Button';
import FileCopy from "@material-ui/icons/FileCopy";
import { CopyToClipboard } from "react-copy-to-clipboard";

const CopyToClipboardBtn = ({ content }) => {
    const onCopy = () => {
        store.addNotification({
            title: "Copied!",
            message: "The text has been copied to your clipboard.",
            type: "success",
            insert: 'top',
            container: 'top-center',
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 5000,
                showIcon: true
            }
        });
    }

    return (
        <CopyToClipboard text={content} onCopy={() => onCopy()}>
            <Button variant="contained" disableElevation size="small" color="primary" startIcon={<FileCopy/>}>Copy to clipboard</Button>
        </CopyToClipboard>
    );
};

export default CopyToClipboardBtn;