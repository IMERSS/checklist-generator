import { connect } from 'react-redux';
import * as actions from '../../store/settings/settings.actions';
import * as selectors from '../../store/settings/settings.selectors';
import RowSettingsDialog from './RowSettingsDialog';

const mapStateToProps = (state) => ({
    open: selectors.isRowSettingsDialogOpen(state),
    rowSettings: selectors.getRowSettings(state),
    selectedColumn: selectors.getSelectedRowColumn(state)
});

const mapDispatchToProps = (dispatch) => ({
    onClose: () => dispatch(actions.closeRowSettingsDialog()),
    updateRowSettings: (settings) => dispatch(actions.updateRowSettings(settings))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RowSettingsDialog);
