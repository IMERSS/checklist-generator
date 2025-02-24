import React from 'react';

const TabPanel = ({ children, value, index }) => {
  if (value !== index) {
    return null;
  }

  return <div style={{ padding: '20px 0 0' }}>{children}</div>;
};

export default TabPanel;
