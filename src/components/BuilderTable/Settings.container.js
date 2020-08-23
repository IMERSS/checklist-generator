import { connect } from 'react-redux';
import * as actions from '../../store/settings/settings.actions';
import * as selectors from '../../store/settings/settings.selectors';
import Settings from './Settings';

const mapStateToProps = (state) => ({
    format: selectors.getFormat(state),
    textIndentNumSpaces: selectors.getTextIndentNumSpaces(state),
    htmlIndentWidth: selectors.getHtmlIndentWidth(state),
    rowClassPrefix: selectors.getRowClassPrefix(state)
});

const mapDispatchToProps = (dispatch) => ({
    onChangeFormat: (format) => dispatch(actions.updateFormat(format)),
    onChangeHtmlIndentWidth: (width) => dispatch(actions.updateHtmlIndentWidth(width)),
    onChangeRowClassPrefix: (prefix) => dispatch(actions.updateRowClassPrefix(prefix)),
    onChangeTextIndentNumSpaces: (numSpaces) => dispatch(actions.updateTextIndentNumSpaces(numSpaces))
});

const container = connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);

export default container;
