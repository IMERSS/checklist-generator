import React from 'react';
import { Stepper } from '../components/Stepper';
import { Step1 } from './Step1';
import Step2 from './Step2.container';
import { Step3 } from './Step3';

const steps = [
    'Intro',
    'Upload file',
    'Build checklist',
    'Generate'
];

const Page = ({ pageIndex, setPageIndex }) => {
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
        <div className="app">
            <h1>Checklist generator</h1>

            <Stepper steps={steps} activeStep={pageIndex} />

            {getContent()}
        </div>
    );
}

export default Page;
