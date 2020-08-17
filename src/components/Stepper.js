import React from "react";
import MUIStepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';


export const Stepper = ({ steps, activeStep }) => {
    return (
        <MUIStepper activeStep={activeStep}>
            {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                // if (isStepSkipped(index)) {
                    stepProps.completed = false;
                // }
                return (
                    <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                );
            })}
        </MUIStepper>
    )
};
