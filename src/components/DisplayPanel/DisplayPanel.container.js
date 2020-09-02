import { connect } from 'react-redux';
import * as actions from '../../store/settings/settings.actions';
import * as selectors from '../../store/settings/settings.selectors';
import DisplayPanel from './DisplayPanel';

const mapStateToProps = (state) => ({
    format: selectors.getFormat(state),
    content: selectors.getPreviewContent(state),
    autoUpdate: selectors.shouldAutoUpdate(state)
});

const mapDispatchToProps = (dispatch) => ({
    setAutoUpdate: (enabled) => dispatch(actions.setAutoUpdate(enabled)),
    manualUpdateDisplay: () => dispatch(actions.manualUpdateDisplay())
});

const container = connect(
    mapStateToProps,
    mapDispatchToProps
)(DisplayPanel);

export default container;