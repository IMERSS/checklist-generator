import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import { Stepper } from '../components/Stepper';
import { Step1 } from './Step1';
import Step2 from './Step2.container';
import Step3 from './Step3.container';

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Open Sans',
            'sans-serif'
        ].join(','),
    }
});

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const steps = [
    'Intro',
    'Upload file',
    'Build checklist',
    'Generate'
];


const Page = ({ pageIndex, setPageIndex }) => {
    const classes = useStyles();

    const getContent = () => {
        if (pageIndex === 0) {
            return (
                <Step1
                    onNext={() => setPageIndex(pageIndex+1)}
                />
            );
        } else if (pageIndex === 1) {
            return (
                <Step2
                    onPrev={() => setPageIndex(pageIndex - 1)}
                    onNext={() => setPageIndex(pageIndex + 1)}
                />
            );
        } else if (pageIndex === 2) {
            return (
                <Step3
                    onPrev={() => setPageIndex(pageIndex - 1)}
                    onNext={() => setPageIndex(pageIndex + 1)}
                />
            );
        }

        return null;
    };

    return (
        <ThemeProvider theme={theme}>
            <>
                <AppBar position="fixed" className="appBar">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Checklist Generator
                        </Typography>
                        <div>
                            <GitHubIcon />
                        </div>
                    </Toolbar>
                </AppBar>
                <div className="app">
                    <Stepper steps={steps} activeStep={pageIndex} />

                    {getContent()}
                </div>
            </>
        </ThemeProvider>
    );
}

export default Page;
