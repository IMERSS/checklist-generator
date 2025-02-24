import { connect } from 'react-redux';
import * as selectors from '../store/settings/settings.selectors';
import { Step4 } from './Step4';

const mapStateToProps = (state) => ({
  format: selectors.getFormat(state),
  generatedContent: selectors.getGeneratedContent(state),
  generatedCss: selectors.getGeneratedCss(state),
});

const mapDispatchToProps = () => ({});

const container = connect(mapStateToProps, mapDispatchToProps)(Step4);

export default container;
