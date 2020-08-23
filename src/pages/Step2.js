import React from 'react';
import Button from "@material-ui/core/Button";
import "./Page2.scss";

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
                <Button variant="outlined" size="small" color="secondary" onClick={onPrev} style={{ marginRight: 10, minWidth: 20 }}>&laquo;</Button>
                <Button variant="outlined" size="small" color="primary" onClick={onNext}>Continue &raquo;</Button>
            </footer>
        );
    }

    return (
        <div>
            <div className="dragDropUpload">
                <input type="file" onChange={onChange} />
            </div>

            <p>
                If you don't have a file on hand, you can use this <a href="">demo file</a> that illustrates a typical
                compatible format.
            </p>

            {getButtons()}
        </div>
    );
};
