import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { withRouter } from 'react-router';

import { actions as modalActions } from 'components/modal-metadata';

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
  onCountryClick = geometry => {
    const { history, targetHover, goalSelected, goalHover } = this.props;
    const iso = geometry.properties.id;
    if (iso && geometry.clickAllowed) {
      let path = `/ndcs/country/${iso}/full?query=1&searchBy=goal`;
      if (targetHover) {
        path = `/ndcs/country/${iso}/full?query=${targetHover}&searchBy=target`;
      } else if (goalSelected) {
        path = `/ndcs/country/${iso}/full?query=${goalSelected}&searchBy=goal`;
      } else if (goalHover) {
        path = `/ndcs/country/${iso}/full?query=${goalHover}&searchBy=goal`;
      }
      history.push(path);
    }
  };

  handleInfoClick = () => {
    this.props.setModalMetadata({
      slugs: 'ndc_sdc_all indicators',
      open: true
    });
  };

  render() {
    return createElement(NdcSdgLinkagesMapComponent, {
      ...this.props,
      onCountryClick: this.onCountryClick,
      handleInfoClick: this.handleInfoClick
    });
  }
}

NdcSdgLinkagesMapContainer.propTypes = {
  targetHover: PropTypes.string,
  goalSelected: PropTypes.string,
  goalHover: PropTypes.number,
  history: PropTypes.object.isRequired,
  setModalMetadata: PropTypes.func.isRequired
};

export { default as component } from './ndc-sdg-linkages-map-component';
export { default as styles } from './ndc-sdg-linkages-map-styles';

export default withRouter(
  connect(mapStateToProps, modalActions)(NdcSdgLinkagesMapContainer)
);
