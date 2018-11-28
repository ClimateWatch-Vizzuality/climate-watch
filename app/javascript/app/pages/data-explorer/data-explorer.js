import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { actions } from 'components/modal-download';

import DataExplorer from './data-explorer-component';

const mapStateToProps = (state, { route, location }) => ({
  navLinks: route.routes.filter(r => r.anchor).map(r => {
    const updatedR = r;
    updatedR.hash = location.hash;
    return updatedR;
  })
});

export default withRouter(connect(mapStateToProps, actions)(DataExplorer));
