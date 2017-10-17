import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
// import Proptypes from 'prop-types';
// import { withRouter } from 'react-router';

import NdcSdgLinkagesMapComponent from './ndc-sdg-linkages-map-component';
import { getPathsWithStyles } from './ndc-sdg-linkages-map-selectors';

const mapStateToProps = state => {
  const { data: goalsData } = state.ndcSdg;
  const data = {
    goalsData,
    goalSelected: '1' // TODO: get this real
  };
  return {
    paths: getPathsWithStyles(data)
  };
};
class NdcSdgLinkagesMapContainer extends PureComponent {
  render() {
    return createElement(NdcSdgLinkagesMapComponent, {
      ...this.props
    });
  }
}

NdcSdgLinkagesMapContainer.propTypes = {};

export { default as component } from './ndc-sdg-linkages-map-component';
export { default as styles } from './ndc-sdg-linkages-map-styles';

export default connect(mapStateToProps)(NdcSdgLinkagesMapContainer);
