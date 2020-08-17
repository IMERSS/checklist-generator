import React from 'react';
import Button from "@material-ui/core/Button";

export const Step2 = ({ onPrev, onNext, hasUploadedData, onUploadFile }) => {
    const onChange = (e) => {
        const file = e.target.files[0];
        onUploadFile(file);
    };

    const getButtons = () => {
        if (!hasUploadedData) {
            return null;
        }

        return (
            <footer>
                <Button variant="outlined" size="small" color="secondary" onClick={onPrev} style={{ marginRight: 10 }}>&laquo; Back</Button>
                <Button variant="outlined" size="small" color="primary" onClick={onNext}>Continue &raquo;</Button>
            </footer>
        );
    }

    return (
        <div>
            <input type="file" onChange={onChange} />
            {getButtons()}
        </div>
    );
};
