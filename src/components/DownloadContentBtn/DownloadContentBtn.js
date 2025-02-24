import React from 'react';
import Button from '@material-ui/core/Button';
import GetApp from '@material-ui/icons/GetApp';
import { downloadFile } from '../../helpers/builder';

const DownloadContentBtn = ({ content, style = {} }) => {
  const onClick = () => {
    downloadFile(content, 'checklist.rtf', 'rtf');
  };

  return (
    <Button
      variant='contained'
      disableElevation
      size='small'
      color='primary'
      startIcon={<GetApp />}
      onClick={onClick}
      style={style}
    >
      Download
    </Button>
  );
};

export default DownloadContentBtn;
