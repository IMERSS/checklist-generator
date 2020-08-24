import { connect } from 'react-redux';
import * as selectors from '../../store/settings/settings.selectors';
import DisplayPanel from './DisplayPanel';

const mapStateToProps = (state) => ({
    format: selectors.getFormat(state),
    content: selectors.getPreviewContent(state)
});

const container = connect(
    mapStateToProps
)(DisplayPanel);

export default container;