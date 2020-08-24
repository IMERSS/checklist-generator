import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FileCopy from "@material-ui/icons/FileCopy";
import TabPanel from "../components/TabPanel";
import "./Page4.scss";

export const Step4 = ({ onPrev, onReturn, format, generatedContent, generatedCss }) => {
    const [tab, setTab] = React.useState(0);

    const getContent = () => {
        if (format === "html") {
            const fullPageContent = `<html>
<head>
<style type="text/css">
${generatedCss}
</style>
</head>
<body>
${generatedContent}
</body>
</html>`;

            return (
                <>
                    <p>
                        The tabs below contain your HTML and CSS for embedding your checklist into your own websites.
                    </p>

                    <Tabs
                        value={tab}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={(e, newValue) => setTab(newValue)}
                    >
                        <Tab label="HTML" />
                        <Tab label="CSS" />
                        <Tab label="Single HTML page" />
                    </Tabs>
                    <TabPanel value={tab} index={0}>
                        <div className="generatePanel">{generatedContent}</div>
                        <div style={{ float: 'right' }}>
                            <CopyToClipboard text={generatedContent}>
                                <Button variant="contained" disableElevation size="small" color="primary" startIcon={<FileCopy />}>Copy to clipboard</Button>
                            </CopyToClipboard>
                        </div>
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        <div className="generatePanel">{generatedCss}</div>
                        <div style={{ float: 'right' }}>
                            <CopyToClipboard text={generatedCss}>
                                <Button variant="contained" disableElevation size="small" color="primary" startIcon={<FileCopy />}>Copy to clipboard</Button>
                            </CopyToClipboard>
                        </div>
                    </TabPanel>
                    <TabPanel value={tab} index={2}>
                        <div className="generatePanel">{fullPageContent}</div>
                        <div style={{ float: 'right' }}>
                            <CopyToClipboard text={fullPageContent}>
                                <Button variant="contained" disableElevation size="small" color="primary" startIcon={<FileCopy />}>Copy to clipboard</Button>
                            </CopyToClipboard>
                        </div>
                    </TabPanel>

                </>
            )
        }

        return (
            <>
                <p>
                    The block below contains your generated content.
                </p>

                <div className="generatePanel">{generatedContent}</div>
                <div style={{ float: 'right' }}>
                    <CopyToClipboard text={generatedContent}>
                        <Button variant="contained" disableElevation size="small" color="primary" startIcon={<FileCopy />}>Copy to clipboard</Button>
                    </CopyToClipboard>
                </div>
            </>
        );
    }

    return (
        <>
            <h1>Done!</h1>

            {getContent()}

            <br />
            <footer>
                <Button variant="outlined" size="small" color="secondary" onClick={onPrev}
                        style={{ marginRight: 10, minWidth: 20 }}>&laquo;</Button>
                <Button variant="outlined" size="small" color="primary" onClick={onReturn}>Start again</Button>
            </footer>
        </>
    );
};