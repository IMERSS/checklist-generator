import React from 'react';

const Settings = ({ format, onChangeFormat, htmlIndentWidth, onChangeHtmlIndentWidth, rowClassPrefix,
    onChangeRowClassPrefix, textIndentNumSpaces, onChangeTextIndentNumSpaces }) => {

    const getRows = () => {
        if (format === "html") {
            return (
                <>
                    <div>
                        <div className="settingsCol1">
                            Indent width
                        </div>
                        <div>
                            <input type="number" value={htmlIndentWidth} style={{ width: 40 }}
                               onChange={(e) => onChangeHtmlIndentWidth(e.target.value, 10)} />px
                        </div>
                    </div>
                    <div>
                        <div className="settingsCol1">
                            HTML class prefix
                        </div>
                        <div>
                            <input type="text" value={rowClassPrefix}
                                   onChange={(e) => onChangeRowClassPrefix(e.target.value)} />
                        </div>
                    </div>
                </>
            );
        }

        return (
            <div>
                <div className="settingsCol1">
                    Num character indent
                </div>
                <div>
                    <input type="number" value={textIndentNumSpaces} style={{ width: 40 }}
                           onChange={(e) => onChangeTextIndentNumSpaces(e.target.value, 10)} />
                </div>
            </div>
        );
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