import React from 'react';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import BuilderTable from '../components/BuilderTable/BuilderTable.container';
import Settings from '../components/BuilderTable/Settings.container';
import Help from '../components/BuilderTable/Help';
import TabPanel from '../components/TabPanel';
import ApplySettingsDialog from '../components/ApplySettingsDialog/ApplySettingsDialog.container';
import './Page3.scss';

export const Step3 = ({
  onPrev,
  onNext,
  builderTab,
  formatLabel,
  setBuilderTab,
}) => (
  <>
    <h1 className='builderStepTitle'>{formatLabel} checklist</h1>

    <Tabs
      value={builderTab}
      indicatorColor='primary'
      textColor='primary'
      onChange={(e, newValue) => setBuilderTab(newValue)}
    >
      <Tab label='Build' />
      <Tab label='Settings' />
      <Tab label='Help' />
    </Tabs>
    <TabPanel value={builderTab} index={0}>
      <BuilderTable />
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
        <Button
          variant='outlined'
          size='small'
          color='primary'
          onClick={onNext}
        >
          Continue &raquo;
        </Button>
      </footer>
    </TabPanel>
    <TabPanel value={builderTab} index={1}>
      <Settings />
      <br />
      <ApplySettingsDialog />
    </TabPanel>
    <TabPanel value={builderTab} index={2}>
      <Help />
    </TabPanel>
  </>
);
