import React from 'react';
import Button from '@material-ui/core/Button';
import FileCopy from '@material-ui/icons/FileCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { showNotification } from '../../helpers/utils';

const CopyToClipboardBtn = ({ content }) => {
    const onCopy = () => {
        showNotification("Copied!", "The text has been copied to your clipboard.");
    }

    return (
        <CopyToClipboard text={content} onCopy={() => onCopy()}>
            <Button variant="contained" disableElevation size="small" color="primary" startIcon={<FileCopy/>}>Copy to clipboard</Button>
        </CopyToClipboard>
    );
};

export default CopyToClipboardBtn;