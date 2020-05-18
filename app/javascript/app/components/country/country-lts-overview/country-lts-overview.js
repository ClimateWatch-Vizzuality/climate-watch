import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { isEmbededComponent } from 'utils/navigation';
import { actions } from 'components/modal-metadata';
import { actions as fetchActions } from 'components/ndcs/ndcs-country-accordion';
import CountryLtsOverviewComponent from './country-lts-overview-component';
import { getCardsData } from './country-lts-overview-selectors';

const mapStateToProps = (state, { location, match }) => {
  const { iso } = match.params;
  const isEmbed = isEmbededComponent(location);
  return {
    iso,
    isEmbed,
    cardData: getCardsData(state, { iso }),
    loading: state.ltsContentOverview.loading,
    sectors: state.ltsContentOverview.data
      ? state.ltsContentOverview.data.sectors
      : null
  };
};

export default withRouter(
  connect(mapStateToProps, {
    ...actions,
    ...fetchActions
  })(CountryLtsOverviewComponent)
);
