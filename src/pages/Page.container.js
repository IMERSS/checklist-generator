import { connect } from 'react-redux';
import * as actions from '../store/settings/settings.actions';
import * as selectors from '../store/settings/settings.selectors';
import Page from './Page';

const mapStateToProps = (state) => ({
  pageIndex: selectors.getPageIndex(state),
  data: selectors.getData(state),
});

const mapDispatchToProps = (dispatch) => ({
  setPageIndex: (pageIndex) => dispatch(actions.setPageIndex(pageIndex)),
});

const container = connect(mapStateToProps, mapDispatchToProps)(Page);

export default container;
