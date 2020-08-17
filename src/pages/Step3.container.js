import { connect } from 'react-redux';
import * as actions from '../store/settings/settings.actions';
import * as selectors from '../store/settings/settings.selectors';
import { Step2 } from './Step2';

const mapStateToProps = (state) => ({
    hasUploadedData: selectors.hasUploadedData(state)
});

const mapDispatchToProps = (dispatch) => ({
    onUploadFile: (file) => dispatch(actions.uploadFile(file))
});

const container = connect(
    mapStateToProps,
    mapDispatchToProps
)(Step2);

export default container;