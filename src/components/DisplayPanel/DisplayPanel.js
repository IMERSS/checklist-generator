import React from 'react';
import Button from '@material-ui/core/Button';
import './displayPanel.scss';

const DisplayPanel = ({
  format,
  autoUpdate,
  setAutoUpdate,
  manualUpdateDisplay,
  content,
}) => {
  let panel;
  const isRtf = format === 'rtf';

  if (format === 'html' || isRtf) {
    let classes = 'displayPanel';
    if (format === 'rtf') {
      classes += ' rtfFormat';
    }
    panel = (
      <div className={classes} dangerouslySetInnerHTML={{ __html: content }} />
    );
  } else {
    panel = <div className='displayPanel textFormat'>{content}</div>;
  }

  let rtfWarning = '';
  if (isRtf) {
    rtfWarning = (
      <div className='rtfNote'>
        Note: the display panel below is very limited for RTF since it's a very
        different medium than HTML. It'll only show bold, italic, underline and
        whatever info your add for each row. You'll need to actually check the
        generated content to see how your checklist looks.
      </div>
    );
  }
  return (
    <>
      {rtfWarning}
      <div className='autoUpdatePanel'>
        <span>
          <input
            type='checkbox'
            checked={autoUpdate}
            id='toggleAutoUpdate'
            onChange={() => setAutoUpdate(!autoUpdate)}
          />
          <label htmlFor='toggleAutoUpdate'>Auto-update display panel</label>
        </span>
        <Button
          variant='contained'
          disableElevation
          size='small'
          disabled={autoUpdate}
          onClick={() => manualUpdateDisplay()}
        >
          Update
        </Button>
      </div>
      {panel}
    </>
  );
};

export default DisplayPanel;
