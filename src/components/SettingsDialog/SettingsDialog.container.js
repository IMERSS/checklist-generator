import { connect } from 'react-redux';
import * as selectors from '../../store/settings/settings.selectors';
import Settings from './SettingsDialog';

const mapStateToProps = (state) => ({
  settingsStr: selectors.getSettingsStr(state),
});

export default connect(mapStateToProps)(Settings);
