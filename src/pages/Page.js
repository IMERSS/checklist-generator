import React, { useEffect } from 'react';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import PlaylistAddCheckIcon from '@material-ui/icons/ListAltTwoTone';
import { Stepper } from '../components/Stepper';
import { Step1 } from './Step1';
import Step2 from './Step2.container';
import Step3 from './Step3.container';
import Step4 from './Step4.container';
import C from '../constants';
import { computeDocumentRowPlaceholders } from '../helpers/builder';

const theme = createTheme({
  typography: {
    fontFamily: ['Open Sans', 'sans-serif'].join(','),
  },
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
    display: 'flex',
  },
}));

const steps = ['Start', 'Upload file', 'Build checklist', 'Generate'];

const Page = ({
  data,
  pageIndex,
  setPageIndex,
  setDocumentRowPlaceholdersGenerated,
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (data) {
      computeDocumentRowPlaceholders(data);
      setDocumentRowPlaceholdersGenerated();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const getContent = () => {
    if (pageIndex === 0) {
      return <Step1 onNext={() => setPageIndex(pageIndex + 1)} />;
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
    } else if (pageIndex === 3) {
      return (
        <Step4
          onPrev={() => setPageIndex(pageIndex - 1)}
          onReturn={() => setPageIndex(pageIndex - 3)}
        />
      );
    }

    return null;
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <AppBar position='fixed' className='appBar'>
          <Toolbar>
            <Typography variant='h6' className={classes.title}>
              <PlaylistAddCheckIcon className='headingIcon' />
              Checklist Generator
            </Typography>
            <div>
              <IconButton
                aria-label='github'
                className={classes.margin}
                onClick={() => window.open(C.GITHUB_URL, '_blank')}
              >
                <GitHubIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <div className='app'>
          <Stepper steps={steps} activeStep={pageIndex} />
          {getContent()}
        </div>
      </>
    </ThemeProvider>
  );
};

export default Page;
