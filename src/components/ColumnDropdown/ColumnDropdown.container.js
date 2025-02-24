import { connect } from 'react-redux';
import { ColumnDropdown } from './ColumnDropdown';
import * as selectors from '../../store/settings/settings.selectors';

const mapStateToProps = (state) => ({
  columns: selectors.getColumns(state),
});
const container = connect(mapStateToProps)(ColumnDropdown);

export default container;
