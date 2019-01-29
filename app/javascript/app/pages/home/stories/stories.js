import { connect } from 'react-redux';
import Component from './stories-component';

const mapStateToProps = state => ({ stories: state.stories.data });

export default connect(mapStateToProps, null)(Component);
