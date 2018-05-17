import { connect } from 'react-redux';
import * as actions from 'components/my-climate-watch/viz-creator/viz-creator-actions';
import Component from './my-cw-vis-card-component';

export default connect(null, actions)(Component);
