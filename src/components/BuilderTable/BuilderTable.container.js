import { connect } from 'react-redux';
import * as actions from '../../store/settings/settings.actions';
import * as selectors from '../../store/settings/settings.selectors';
import { BuilderTable } from './BuilderTable';

const mapStateToProps = (state) => ({
    rows: selectors.getRowData(state)
});

const mapDispatchToProps = (dispatch) => ({
    onAddRow: () => dispatch(actions.addRow()),
    onDeleteRow: (rowId) => dispatch(actions.deleteRow(rowId)),
    onSelectColumn: (rowId, colIndex) => dispatch(actions.selectColumn(rowId, colIndex)),
    onToggleRowIndentation: (rowId) => dispatch(actions.toggleRowIndentation(rowId))
});

const container = connect(
    mapStateToProps,
    mapDispatchToProps
)(BuilderTable);

export default container;