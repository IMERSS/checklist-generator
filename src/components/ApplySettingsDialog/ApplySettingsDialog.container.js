import { connect } from 'react-redux';
import * as actions from '../../store/settings/settings.actions';
import * as selectors from '../../store/settings/settings.selectors';
import ApplySettingsDialog from './ApplySettingsDialog';

const mapStateToProps = (state) => ({
    dialogOpen: selectors.isApplySettingsDialogOpen((state)),
    error: selectors.getSettingsError(state)
});

const mapDispatchToProps = (dispatch) => ({
    processSettings: (settingsStr) => dispatch(actions.processSettings(settingsStr)),
    openDialog: () => dispatch(actions.openApplySettingsDialog()),
    closeDialog: () => dispatch(actions.closeApplySettingsDialog())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApplySettingsDialog);
