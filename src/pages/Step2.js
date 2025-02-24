import React from 'react';
import Button from '@material-ui/core/Button';
import { useDropzone } from 'react-dropzone';
import './Page2.scss';

export const Step2 = ({
  onPrev,
  onNext,
  uploadedFilename,
  hasUploadedData,
  onUploadFile,
  onReset,
}) => {
  const onDrop = React.useCallback(
    (files) => {
      onUploadFile(files[0]);
    },
    [onUploadFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const getButtons = () => {
    let continueButton = null;
    if (hasUploadedData) {
      continueButton = (
        <Button
          variant='outlined'
          size='small'
          color='primary'
          onClick={onNext}
        >
          Continue &raquo;
        </Button>
      );
    }

    return (
      <footer>
        <Button
          variant='outlined'
          size='small'
          color='secondary'
          onClick={onPrev}
          style={{ marginRight: 10, minWidth: 20 }}
        >
          &laquo;
        </Button>
        {continueButton}
      </footer>
    );
  };

  const getContent = () => {
    if (hasUploadedData) {
      return (
        <p>
          You have an uploaded file: <b>{uploadedFilename}</b> (data is stored
          in your browser's local storage).{' '}
          <span className='link' onClick={onReset}>
            Click here to reset
          </span>{' '}
          and upload another.
        </p>
      );
    }

    return (
      <>
        <div className='dragDropUpload' {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the file here ...</p>
          ) : (
            <p>Drag and drop your file here, or click to select a file.</p>
          )}
        </div>

        <p>
          If you don't have a file on hand, you can use this{' '}
          <a href='./demo-data.csv' target='_blank'>
            demo file
          </a>{' '}
          that illustrates a typical compatible format.
        </p>
      </>
    );
  };

  return (
    <div>
      {getContent()}
      {getButtons()}
    </div>
  );
};
