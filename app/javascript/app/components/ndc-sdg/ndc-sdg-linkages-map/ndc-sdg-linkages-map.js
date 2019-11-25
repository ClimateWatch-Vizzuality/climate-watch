import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { withRouter } from 'react-router';
import { isPageContained } from 'utils/navigation';

import { actions as modalActions } from 'components/modal-metadata';

import NdcSdgLinkagesMapComponent from './ndc-sdg-linkages-map-component';
import {
  getNdcsSdgsGoalsDataSelected,
  getPathsWithStyles,
  getLinkToDataExplorer
} from './ndc-sdg-linkages-map-selectors';

const mapStateToProps = (state, { location, goalHover, targetHover }) => {
  const { data: goalsData } = state.ndcSdg;
  const search = qs.parse(location.search);
  const goalSelected = search.goal || '';
  const data = {
    goalsData,
    goalSelected,
    goalHover,
    targetHover,
    search
  };
  return {
    goal: getNdcsSdgsGoalsDataSelected(data),
    paths: getPathsWithStyles(data),
    goalsData,
    goalSelected,
    goalHover,
    targetHover,
    downloadLink: getLinkToDataExplorer(data)
  };
};
class NdcSdgLinkagesMapContainer extends PureComponent {
  onCountryClick = geometry => {
    const { history, targetHover, goalSelected, goalHover, goal } = this.props;
    const iso = geometry.properties.id;
    if (iso && geometry.clickAllowed) {
      const { document_type, language } = goal.locations[iso];
      const documentParam = `?document=${document_type}-${language}`;
      const commonPath = `/ndcs/country/${iso}/full${documentParam}&query=`;
      let path = `${commonPath}1&searchBy=goal`;
      if (targetHover) {
        path = `${commonPath}${targetHover}&searchBy=target`;
      } else if (goalSelected) {
        path = `${commonPath}${goalSelected}&searchBy=goal`;
      } else if (goalHover) {
        path = `${commonPath}${goalHover}&searchBy=goal`;
      }
      if (isPageContained) {
        window.open(path, '_blank');
      } else {
        history.push(path);
      }
    }
  };

  handleInfoClick = () => {
    this.props.setModalMetadata({
      category: 'NDC Content Map',
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
  goal: PropTypes.object,
  history: PropTypes.object.isRequired,
  setModalMetadata: PropTypes.func.isRequired
};

export { default as component } from './ndc-sdg-linkages-map-component';
export { default as styles } from './ndc-sdg-linkages-map-styles';

export default withRouter(
  connect(mapStateToProps, modalActions)(NdcSdgLinkagesMapContainer)
);
