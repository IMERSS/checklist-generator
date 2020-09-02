import { connect } from 'react-redux';
import * as actions from '../../store/settings/settings.actions';
import * as selectors from '../../store/settings/settings.selectors';
import ApplySettingsDialog from './ApplySettingsDialog';

const mapStateToProps = (state) => ({
    error: selectors.getSettingsError(state)
});

const mapDispatchToProps = (dispatch) => ({
    processSettings: (settingsStr) => dispatch(actions.processSettings(settingsStr))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApplySettingsDialog);
