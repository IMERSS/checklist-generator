import React from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import "./RowSettingsDialog.scss";


const RowSettingsDialog = ({ selectedColumn, onClose, open, rtfDefaultLineHeight, rowSettings, updateRowSettings, arbitraryRegex, updateArbitraryRegex }) => {
    const settings = {
        rtfLineHeightUseDefault: true,
        rtfLineHeight: '',
        ...rowSettings
    };

    const updateSettings = (setting, value) => {
        updateRowSettings({
            ...settings,
            [setting]: value
        });
    };

    const updateArbRegex = (index, field, value) => {
    	const newData = [
		    ...arbitraryRegex
	    ];
    	newData[index][field] = value;
    	if (field === 'example') {
    		const [regex, replacement] = value.split('`');
		    newData[index].regex = regex;
		    newData[index].replacement = replacement;
	    }

    	updateArbitraryRegex(newData);
    };


    if (!selectedColumn) {
    	return null;
    }

    return (
        <Dialog
            disableBackdropClick
            onEscapeKeyDown={onClose}
            aria-labelledby="confirmation-dialog-title"
            maxWidth="md"
            open={open}
        >
            <DialogTitle id="confirmation-dialog-title">RTF Row Settings: <i>{selectedColumn}</i></DialogTitle>
            <DialogContent dividers>
                <div className="builderSettings">
                    <div>
                        <div className="settingsCol1">
                            Line height
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="lineHeightDefault"
                                checked={settings.rtfLineHeightUseDefault}
                                onChange={() => updateSettings('rtfLineHeightUseDefault', true)} />
                            <label htmlFor="lineHeightDefault">Default ({rtfDefaultLineHeight})</label>
                            <input
                                type="radio"
                                id="lineHeightCustom"
                                checked={!settings.rtfLineHeightUseDefault}
                                onChange={() => updateSettings('rtfLineHeightUseDefault', false)} />
                            <label htmlFor="lineHeightCustom">Custom: </label>
                            <input
                                type="number"
                                value={settings.rtfLineHeight}
                                checked={!settings.rtfLineHeightUseDefault}
                                style={{ width: 40 }}
                                onChange={(e) => updateSettings('rtfLineHeight', e.target.value)} />
                        </div>
                    </div>
                </div>

                <h3>Arbitrary regex</h3>

                <p>
                    This section lets you define arbitrary rules to be applied on the placeholders used in this row, to
	                make whatever conversions you want. Basically they let you alter the content of your CSV cells
	                rather than just output them as-is. Note that these run <i>prior</i> to the HTML parsing step, so
	                you can add in <b>b</b>, <b>i</b> and other compatible tags (see help tab in parent page).
                </p>

	            <div className="arbitraryRegexTable">
		            <div className="heading">
			            <div className="col1">
				            Example
			            </div>
			            <div className="col2">
				            Regex
			            </div>
			            <div className="col3">
				            Replacement
			            </div>
		            </div>
		            <div>
			            <div className="col1">
				            <select defaultValue={arbitraryRegex[0].example} onChange={(e) => updateArbRegex(0, 'example', e.target.value)}>
					            <option value="">Please select</option>
					            <option value="\bsp\.`<noStyle>sp.</noStyle>">Remove formatting from "sp." string</option>
					            <option value="\bcf\.\s`<noStyle>cf. </noStyle>">Remove formatting for "cf." (confer/conferatur) string</option>
				            </select>
			            </div>
			            <div className="col2">
				            <input type="text" value={arbitraryRegex[0].regex} onChange={(e) => updateArbRegex(0, 'regex', e.target.value)} />
			            </div>
			            <div className="col3">
				            <input type="text" value={arbitraryRegex[0].replacement} onChange={(e) => updateArbRegex(0, 'replacement', e.target.value)} />
			            </div>
		            </div>

		            <div>
			            <div className="col1">
				            <select defaultValue={arbitraryRegex[1].example} onChange={(e) => updateArbRegex(1, 'example', e.target.value)}>
					            <option value="">Please select</option>
					            <option value="\bsp\.`<noStyle>sp.</noStyle>">Remove formatting from "sp." string</option>
					            <option value="\bcf\.\s`<noStyle>cf. </noStyle>">Remove formatting for "cf." (confer/conferatur) string</option>
				            </select>
			            </div>
			            <div className="col2">
				            <input type="text" value={arbitraryRegex[1].regex} onChange={(e) => updateArbRegex(1, 'regex', e.target.value)} />
			            </div>
			            <div className="col3">
				            <input type="text" value={arbitraryRegex[1].replacement} onChange={(e) => updateArbRegex(1, 'replacement', e.target.value)} />
			            </div>
		            </div>

		            <div>
			            <div className="col1">
				            <select defaultValue={arbitraryRegex[2].example} onChange={(e) => updateArbRegex(2, 'example', e.target.value)}>
					            <option value="">Please select</option>
					            <option value="\bsp\.`<noStyle>sp.</noStyle>">Remove formatting from "sp." string</option>
					            <option value="\bcf\.\s`<noStyle>cf. </noStyle>">Remove formatting for "cf." (confer/conferatur) string</option>
				            </select>
			            </div>
			            <div className="col2">
				            <input type="text" value={arbitraryRegex[2].regex} onChange={(e) => updateArbRegex(2, 'regex', e.target.value)} />
			            </div>
			            <div className="col3">
				            <input type="text" value={arbitraryRegex[2].replacement} onChange={(e) => updateArbRegex(2, 'replacement', e.target.value)} />
			            </div>
		            </div>

		            <div>
			            <div className="col1">
				            <select defaultValue={arbitraryRegex[3].example} onChange={(e) => updateArbRegex(3, 'example', e.target.value)}>
					            <option value="">Please select</option>
					            <option value="\bsp\.`<noStyle>sp.</noStyle>">Remove formatting from "sp." string</option>
					            <option value="\bcf\.\s`<noStyle>cf. </noStyle>">Remove formatting for "cf." (confer/conferatur) string</option>
				            </select>
			            </div>
			            <div className="col2">
				            <input type="text" value={arbitraryRegex[3].regex} onChange={(e) => updateArbRegex(3, 'regex', e.target.value)} />
			            </div>
			            <div className="col3">
				            <input type="text" value={arbitraryRegex[3].replacement} onChange={(e) => updateArbRegex(3, 'replacement', e.target.value)} />
			            </div>
		            </div>
	            </div>

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default RowSettingsDialog;
