import React from 'react';
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import BuilderTable from '../components/BuilderTable/BuilderTable.container';
import Settings from "../components/BuilderTable/Settings";
import Help from "../components/BuilderTable/Help";

const TabPanel = ({ children, value, index }) => {
    if (value !== index) {
        return null;
    }

    return (
        <div style={{ padding: "20px 0 0" }}>
            {children}
        </div>
    );
}

export const Step3 = ({ onPrev, onNext, builderTab, setBuilderTab }) => {
    console.log({ builderTab, setBuilderTab });

    return (
        <>
            <Tabs
                value={builderTab}
                indicatorColor="primary"
                textColor="primary"
                onChange={(e, newValue) => setBuilderTab(newValue)}
                aria-label="disabled tabs example"
            >
                <Tab label="Build" />
                <Tab label="Settings" />
                <Tab label="Help" />
            </Tabs>
            <TabPanel value={builderTab} index={0}>
                <BuilderTable />
            </TabPanel>
            <TabPanel value={builderTab} index={1}>
                <Settings />
            </TabPanel>
            <TabPanel value={builderTab} index={2}>
                <Help />
            </TabPanel>

            <footer>
                <Button variant="outlined" size="small" color="secondary" onClick={onPrev} style={{ marginRight: 10, minWidth: 20 }}>&laquo;</Button>
                <Button variant="outlined" size="small" color="primary" onClick={onNext}>Continue &raquo;</Button>
            </footer>
        </>
    );
};
