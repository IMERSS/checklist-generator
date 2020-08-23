import React from 'react';

const Settings = ({ format }) => (
    <div>
        <div>
            <div className="settingsCol1">
                Format
            </div>
            <div>
                <input type="radio" id="htmlFormat" />
                <label htmlFor="htmlFormat">HTML</label>
                <input type="radio" id="textFormat" />
                <label htmlFor="textFormat">Text</label>
            </div>
        </div>
        <div>
            <div className="settingsCol1">
                Indentation
            </div>
            <div>
            </div>
        </div>
    </div>
);

export default Settings;