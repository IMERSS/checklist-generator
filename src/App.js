import React, { useState } from 'react';
// import { Provider } from 'react-redux';
import { Stepper } from './components/Stepper';
import { Step1 } from './pages/Step1';
import "./css/global.css";

const steps = [
    'Intro',
    'Upload file',
    'Build checklist',
    'Generate'
];

function App() {
    const [stepIndex, setStepIndex] = useState(0);

    return (
        <div className="app">
            <h1>Checklist generator</h1>

            <Stepper steps={steps} activeStep={stepIndex} />

            <Step1 onNext={() => setStepIndex(stepIndex+1)} />
        </div>
    );
}

export default App;
