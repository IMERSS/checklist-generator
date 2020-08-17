import React from 'react';
import Button from "@material-ui/core/Button";

export const Step3 = ({ onPrev, onNext }) => {
    // const [includesHeaderRow, setIncludesHeaderRow] = useState(false);

    return (
        <div>



            <Button variant="outlined" size="small" color="secondary" onClick={onPrev} style={{ marginRight: 10 }}>&laquo; Back</Button>
            <Button variant="outlined" size="small" color="primary" onClick={onNext}>Continue &raquo;</Button>
        </div>
    );
};
