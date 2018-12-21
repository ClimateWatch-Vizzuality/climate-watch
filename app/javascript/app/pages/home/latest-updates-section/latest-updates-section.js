import { connect } from 'react-redux';
import LatestUpdatesComponent from './latest-updates-section-component';

const mapStateToProps = ({ latestUpdates }) => ({ latestUpdates });

export default connect(mapStateToProps)(LatestUpdatesComponent);
