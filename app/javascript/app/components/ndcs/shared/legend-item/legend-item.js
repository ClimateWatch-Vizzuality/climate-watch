import { connect } from 'react-redux';
import actions from 'components/ndcs/shared/explore-map/explore-map-actions';
import LegendItem from './legend-item-component';

export default connect(null, actions)(LegendItem);
