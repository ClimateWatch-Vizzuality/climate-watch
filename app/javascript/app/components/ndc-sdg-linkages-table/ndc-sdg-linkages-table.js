import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
// import Proptypes from 'prop-types';
// import { withRouter } from 'react-router';

import NdcSdgLinkagesTableComponent from './ndc-sdg-linkages-table-component';
import { parsedNdcsSdgs } from './ndc-sdg-linkages-table-selectors';

const mapStateToProps = state => {
  const { ndcsSdgsMeta } = state;
  return {
    sdgs: parsedNdcsSdgs(ndcsSdgsMeta)
  };
};

class NdcSdgLinkagesTableContainer extends PureComponent {
  render() {
    return createElement(NdcSdgLinkagesTableComponent, {
      ...this.props
    });
  }
}

NdcSdgLinkagesTableContainer.propTypes = {};

export { default as component } from './ndc-sdg-linkages-table-component';
export { default as styles } from './ndc-sdg-linkages-table-styles';

export default connect(mapStateToProps, null)(NdcSdgLinkagesTableContainer);
