import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { getLocationParamUpdated } from 'utils/navigation';
import qs from 'query-string';
import actions from './ndc-sdg-linkages-table-actions';

import NdcSdgLinkagesTableComponent from './ndc-sdg-linkages-table-component';
import { parsedNdcsSdgs } from './ndc-sdg-linkages-table-selectors';

const mapStateToProps = (state, { location }) => {
  const { ndcsSdgsMeta } = state;
  const selectedSDG = qs.parse(location.search).sdg;
  return {
    sdgs: parsedNdcsSdgs(ndcsSdgsMeta),
    selectedSDG
  };
};

class NdcSdgLinkagesTableContainer extends PureComponent {
  updateUrlParam(param, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, param, clear));
  }

  selectSDG = sdgNumber => {
    this.updateUrlParam({ name: 'sdg', value: sdgNumber });
  };

  render() {
    return createElement(NdcSdgLinkagesTableComponent, {
      ...this.props,
      selectSDG: this.selectSDG
    });
  }
}

NdcSdgLinkagesTableContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export { default as component } from './ndc-sdg-linkages-table-component';
export { default as styles } from './ndc-sdg-linkages-table-styles';
export { initialState } from './ndc-sdg-linkages-table-reducers';
export { default as reducers } from './ndc-sdg-linkages-table-reducers';
export { default as actions } from './ndc-sdg-linkages-table-actions';

export default withRouter(
  connect(mapStateToProps, actions)(NdcSdgLinkagesTableContainer)
);
