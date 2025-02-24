import { connect } from 'react-redux';
import * as actions from '../store/settings/settings.actions';
import * as selectors from '../store/settings/settings.selectors';
import { Step3 } from './Step3';

const mapStateToProps = (state) => ({
  hasUploadedData: selectors.hasUploadedData(state),
  builderTab: selectors.getBuilderTab(state),
  formatLabel: selectors.getFormatLabel(state),
});

const mapDispatchToProps = (dispatch) => ({
  onUploadFile: (file) => dispatch(actions.uploadFile(file)),
  setBuilderTab: (tab) => dispatch(actions.setBuilderTab(tab)),
});

const container = connect(mapStateToProps, mapDispatchToProps)(Step3);

export default container;
