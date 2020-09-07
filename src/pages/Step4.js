import React from 'react';
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "../components/TabPanel";
import CopyToClipboardBtn from "../components/CopyToClipboard/CopyToClipboardBtn";
import DownloadContentBtn from "../components/DownloadContentBtn/DownloadContentBtn";
import SettingsDialog from "../components/SettingsDialog/SettingsDialog.container";
import "./Page4.scss";

export const Step4 = ({ onPrev, onReturn, format, generatedContent, generatedCss }) => {
    const [tab, setTab] = React.useState(0);
    const [settingsDialogOpen, setSettingsDialogVisibility] = React.useState(false);

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
                            <CopyToClipboardBtn content={generatedContent} />
                        </div>
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        <div className="generatePanel">{generatedCss}</div>
                        <div style={{ float: 'right' }}>
                            <CopyToClipboardBtn content={generatedCss} />
                        </div>
                    </TabPanel>
                    <TabPanel value={tab} index={2}>
                        <div className="generatePanel">{fullPageContent}</div>
                        <div style={{ float: 'right' }}>
                            <CopyToClipboardBtn content={fullPageContent} />
                        </div>
                    </TabPanel>

                </>
            )
        }

        let rtfStr = null;
        let button = <CopyToClipboardBtn content={generatedContent} />;
        if (format === 'rtf') {
            rtfStr = (
                <>
                    Since this is <b>RTF</b> format, you'll need to copy it to your clipboard and create a new file in <u>plain
                    text format</u>, and then give it an <b>.rtf</b> extension. Then shut the application down
                    and re-open it to see the formatting styles applied.
                </>
            );
            button = <DownloadContentBtn content={generatedContent} />;
        }

        return (
            <>
                <p>
                    The panel below contains your generated content. {rtfStr}
                </p>

                <div className="generatePanel">{generatedContent}</div>
                <div style={{ float: 'right' }}>
	                {button}
                </div>
            </>
        );
    }

    return (
        <>
            <h1>Done!</h1>

            {getContent()}

            <SettingsDialog
                open={settingsDialogOpen}
                onClose={() => setSettingsDialogVisibility(false)}
            />

            <br />
            <footer>
                <Button variant="outlined" size="small" color="secondary" onClick={onPrev}
                        style={{ marginRight: 10, minWidth: 20 }}>&laquo;</Button>
                <Button variant="outlined" size="small" color="primary" onClick={onReturn}>Start again</Button>
                <span className="buttonDivider">|</span>

                <Button variant="outlined" size="small" color="default" onClick={() => setSettingsDialogVisibility(true)}>Save Settings</Button>
            </footer>
        </>
    );
};
