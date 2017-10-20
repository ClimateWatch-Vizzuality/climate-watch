import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import qs from 'query-string';
import { withRouter } from 'react-router';

import NdcSdgLinkagesMapComponent from './ndc-sdg-linkages-map-component';
import {
  getNdcsSdgsGoalsDataSelected,
  getPathsWithStyles
} from './ndc-sdg-linkages-map-selectors';

const mapStateToProps = (state, { location, goalHover, targetHover }) => {
  const { data: goalsData } = state.ndcSdg;
  const goalSelected = qs.parse(location.search).goal;
  const data = {
    goalsData,
    goalSelected,
    goalHover,
    targetHover
  };
  return {
    goal: getNdcsSdgsGoalsDataSelected(data),
    paths: getPathsWithStyles(data),
    goalSelected,
    goalHover,
    targetHover
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

export default withRouter(connect(mapStateToProps)(NdcSdgLinkagesMapContainer));
