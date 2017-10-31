import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { getLocationParamUpdated } from 'utils/navigation';
import qs from 'query-string';

import NdcSdgLinkagesTableComponent from './ndc-sdg-linkages-table-component';
import {
  getParsedGoals,
  getGoalSelected
} from './ndc-sdg-linkages-table-selectors';

const mapStateToProps = (state, { location }) => {
  const { ndcsSdgsMeta } = state;
  const selectedGoal = qs.parse(location.search).goal;
  const sdgData = {
    selectedGoal,
    meta: ndcsSdgsMeta.data
  };
  return {
    goals: getParsedGoals(sdgData),
    selectedGoal: getGoalSelected(sdgData)
  };
};

class NdcSdgLinkagesTableContainer extends PureComponent {
  updateUrlParam(param, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, param, clear));
  }

  handleClickGoal = sdgNumber => {
    this.updateUrlParam({ name: 'goal', value: sdgNumber });
  };

  handleClickClose = () => {
    this.props.onTargetHover(null);
    this.updateUrlParam({ name: 'goal', value: '' });
  };

  render() {
    return createElement(NdcSdgLinkagesTableComponent, {
      ...this.props,
      handleClickGoal: this.handleClickGoal,
      handleClickClose: this.handleClickClose
    });
  }
}

NdcSdgLinkagesTableContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  onTargetHover: PropTypes.func.isRequired
};

export { default as component } from './ndc-sdg-linkages-table-component';
export { default as styles } from './ndc-sdg-linkages-table-styles';

export default withRouter(
  connect(mapStateToProps, null)(NdcSdgLinkagesTableContainer)
);
