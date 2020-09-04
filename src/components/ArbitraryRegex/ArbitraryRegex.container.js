import { connect } from 'react-redux';
import * as actions from '../../store/settings/settings.actions';
import * as selectors from '../../store/settings/settings.selectors';
import { BuilderTable } from './BuilderTable';

const mapStateToProps = (state) => ({
    rows: selectors.getRowData(state),
    format: selectors.getFormat(state)
});

const mapDispatchToProps = (dispatch) => ({
    onAddRow: () => dispatch(actions.addRow()),
    onDeleteRow: (rowId) => dispatch(actions.deleteRow(rowId)),
    onUpdate: (rowIndex, targetField, value) => dispatch(actions.updateSetting(rowIndex, targetField, value))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BuilderTable);
