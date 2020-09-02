import React from "react";
import Button from "@material-ui/core/Button";
import FileCopy from "@material-ui/icons/FileCopy";
import { CopyToClipboard } from "react-copy-to-clipboard";

const CopyToClipboardBtn = (content) => (
    <CopyToClipboard text={content}>
        <Button variant="contained" disableElevation size="small" color="primary" startIcon={<FileCopy />}>Copy to clipboard</Button>
    </CopyToClipboard>
);

export default CopyToClipboardBtn;