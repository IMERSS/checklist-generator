import React from 'react';

const Settings = ({ format, onChangeFormat, htmlIndentWidth, onChangeHtmlIndentWidth, rowClassPrefix, onChangeRowClassPrefix }) => {
    const getRows = () => {
        if (format === "html") {
            return (
                <>
                    <div>
                        <div className="settingsCol1">
                            Indent width
                        </div>
                        <div>
                            <input type="text" value={htmlIndentWidth} style={{ width: 30 }}
                               onChange={(e) => onChangeHtmlIndentWidth(e.target.value)} />px
                        </div>
                    </div>
                    <div>
                        <div className="settingsCol1">
                            Row class prefix
                        </div>
                        <div>
                            <input type="text" value={rowClassPrefix}
                                   onChange={(e) => onChangeRowClassPrefix(e.target.value)} />
                        </div>
                    </div>
                </>
            );
        }
    };

    return (
        <div className="builderSettings">
            <div>
                <div className="settingsCol1">
                    Format
                </div>
                <div>
                    <input type="radio" id="htmlFormat" checked={format === "html"}
                           onChange={() => onChangeFormat('html')}/>
                    <label htmlFor="htmlFormat">HTML</label>
                    <input type="radio" id="textFormat" checked={format === "text"}
                           onChange={() => onChangeFormat('text')}/>
                    <label htmlFor="textFormat">Text</label>
                </div>
            </div>
            {getRows()}
        </div>
    );
};

export default Settings;