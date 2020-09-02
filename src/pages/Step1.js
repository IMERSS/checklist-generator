import React from 'react';
import Button from '@material-ui/core/Button';
import TabPanel from "../components/TabPanel";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";


export const Step1 = ({ onNext }) => {
    const [tab, setTab] = React.useState(0);

    return (
        <div>
            <h1>Checklist Generator</h1>

            <Tabs
                value={tab}
                indicatorColor="primary"
                textColor="primary"
                onChange={(e, newValue) => setTab(newValue)}
            >
                <Tab label="About" />
                <Tab label="Features" />
            </Tabs>
            <TabPanel value={tab} index={0}>
                <div className="introPanel">
                    <div>
                        <p>
                            This is a simple, free online tool that <i>takes a CSV file that looks like this...</i>
                        </p>
                        <img src={`${process.env.PUBLIC_URL}/table.png`} width={415} height={252}
                             alt="Original CSV table format example"/>
                    </div>
                    <div>
                        <p>
                            and <i>converts it to a checklist that looks like this</i>...
                        </p>
                        <img src={`${process.env.PUBLIC_URL}/checklist.png`} width={230} height={395}
                             alt="Generated checklist example"/>
                    </div>
                </div>
            </TabPanel>
            <TabPanel value={tab} index={1}>
                <ul>
                    <li>Works on any CSV content that has the same format as shown in the image on the About tab, where
                        a column has a repeated value for all children.
                    </li>
                    <li>Lets you generate HTML, RTF (Rich Text Format) or plain text checklists.</li>
                    <li>Allows you to extract and display only the column data you want.</li>
                    <li>Uses a templating language for generating the content, so you can apply logic to output different row
                        values based on your data set.
                    </li>
                    <li>Stores your settings and data as you progress, so you won't lose anything if you accidentally navigate away.
                    </li>
                    <li>Allows you to save your settings in a separate file.</li>
                    <li>Various options for RTF generation such as font size, family and line height to help you
                    cut down on manual editing of the generated code to make it look exactly how you want.</li>
                    <li>Option (RTF only) to run arbitrary rules on the data to format it how you need.</li>
                </ul>
            </TabPanel>

            <Button variant="outlined" size="small" color="primary" onClick={onNext}>Get Started &raquo;</Button>
        </div>
    );
};
