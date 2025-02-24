import { connect } from 'react-redux';
import * as actions from '../../store/settings/settings.actions';
import * as selectors from '../../store/settings/settings.selectors';
import Settings from './Settings';

const mapStateToProps = (state) => ({
  format: selectors.getFormat(state),
  textIndentNumSpaces: selectors.getTextIndentNumSpaces(state),
  htmlIndentWidth: selectors.getHtmlIndentWidth(state),
  rowClassPrefix: selectors.getRowClassPrefix(state),
  rtfDefaultFontSize: selectors.getRtfDefaultFontSize(state),
  rtfDefaultLineHeight: selectors.getRtfDefaultLineHeight(state),
});

const mapDispatchToProps = (dispatch) => ({
  onChangeSetting: (settingName, value) =>
    dispatch(actions.updateSetting(settingName, value)),
});

const container = connect(mapStateToProps, mapDispatchToProps)(Settings);

export default container;
