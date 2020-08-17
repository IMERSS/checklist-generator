import React from 'react';
import Button from '@material-ui/core/Button';

export const Step1 = ({ onNext }) => {
    return (
        <div>
            <p>
                Welcome! Intro blurb here.
            </p>

            <Button variant="outlined" size="small" color="primary" onClick={onNext}>Continue &raquo;</Button>
        </div>
    );
};
