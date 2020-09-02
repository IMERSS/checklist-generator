import React from 'react';

const Settings = ({ format, onChangeFormat, htmlIndentWidth, onChangeHtmlIndentWidth, rowClassPrefix,
    onChangeRowClassPrefix, textIndentNumSpaces, onChangeTextIndentNumSpaces }) => {

    const getRows = () => {
        let rows = [];
        if (format === "html") {
            rows.push(
                <div key="indentWidth">
                    <div className="settingsCol1">
                        Indent width
                    </div>
                    <div>
                        <input type="number" value={htmlIndentWidth} style={{width: 40}}
                               onChange={(e) => onChangeHtmlIndentWidth(e.target.value, 10)}/>px

                        <div className="tip">
                            This is a convenience setting. Any builder rows where you check the "Indent" checkbox will
                            automatically get indented by this amount, relative to the previous indented row. If you
                            want <i>different</i> levels of indentation for each row, don't check the Indent checkboxes
                            and instead supply your own HTML/CSS to do the appropriate indentation.
                        </div>
                    </div>
                </div>
            );
            rows.push(
                <div key="htmlClassPrefix">
                    <div className="settingsCol1">
                        HTML class prefix
                    </div>
                    <div>
                        <input type="text" value={rowClassPrefix}
                               onChange={(e) => onChangeRowClassPrefix(e.target.value)}/>

                       <div className="tip">
                           This applies a class to every row which you can use for your own styling. Values from a
                           particular column will be given a class for that column, e.g. with a prefix value of
                           <b>cg-col-</b>, you'll see <b>cg-col-5</b> in the generated content for all values from the
                           5th column. This value is also used for indentation. Depending on which columns you select
                           in the builder table to be indented, they will get a <b>cg-col-indent-N</b> class applied.
                           That is what allows the indentation styles to be applied.
                       </div>
                    </div>
                </div>
            );
        }
        if (format === "text" || format === "rtf") {
            rows.push(
                <div key="numCharIndent">
                    <div className="settingsCol1">
                        Num character indent
                    </div>
                    <div>
                        <input type="number" value={textIndentNumSpaces} style={{ width: 40 }}
                               onChange={(e) => onChangeTextIndentNumSpaces(e.target.value, 10)} />

                        <div className="tip">
                            This is a convenience setting. Any builder rows where you check the "Indent" checkbox will
                            automatically get indented by this number of characters, relative to the previous indented row.
                            If you want <i>different</i> levels of indentation for each row, don't check those checkboxes.
                            Instead, manually indent the rows with however many number of spaces you want.
                        </div>
                    </div>
                </div>
            );
        }

        return rows;
    };

    const getFormatDesc = () => {
        if (format === 'html') {
            return (
                <div className="tip">
                    HTML format allows you to enter <i>any</i> HTML in the builder rows and they'll be output as-is in the final
                    generated HTML.
                </div>
            )
        }

        if (format === 'rtf') {
            return (
                <div className="tip">
                    RTF stands for <i>Rich Text Format</i>. This is a format understood by any rich-text editor like
                    Word, Wordperfect, TextEdit and Open Office. To keep formatting the content as simple as possible,
                    you can still enter HTML in the builder rows, but currently it will only convert the following tags
                    to their RTF equivalents: <b>bold</b> ({'<b>'}), <b>italic</b> ({'<i>'}), <b>underline</b> ({'<u>'}) and <b>line
                    breaks</b> ({'<br>'}). All other tags are stripped out.
                </div>
            )
        }

        if (format === 'text') {
            return (
                <div className="tip">
                    This option outputs plain text - you cannot add any formatting rules such as bold, italic, underline.
                </div>
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
                    <input type="radio" id="rtfFormat" checked={format === "rtf"}
                           onChange={() => onChangeFormat('rtf')}/>
                    <label htmlFor="rtfFormat">RTF</label>
                    <input type="radio" id="textFormat" checked={format === "text"}
                           onChange={() => onChangeFormat('text')}/>
                    <label htmlFor="textFormat">Text</label>

                    {getFormatDesc()}
                </div>
            </div>
            {getRows()}
        </div>
    );
};

export default Settings;