import { createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { isEmbededComponent } from 'utils/navigation';
import { actions } from 'components/modal-metadata';
import { actions as fetchActions } from 'components/ndcs/ndcs-country-accordion';
import { handleAnalytics } from 'utils/analytics';
import { getCardsData } from './country-lts-overview-selectors';
import CountryLtsOverviewComponent from './country-lts-overview-component';

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

function CountryLtsOverviewContainer(props) {
  const { setModalMetadata } = props;

  const handleAnalyticsClick = () => {
    handleAnalytics('Country', 'Leave page to explore data', 'Ndc Overview');
  };

  const handleInfoClick = () => {
    setModalMetadata({
      customTitle: 'LTS Explore',
      category: 'LTS Explore Map',
      slugs: ['ndc_lts'],
      open: true
    });
  };
  return createElement(CountryLtsOverviewComponent, {
    ...props,
    handleInfoClick,
    handleAnalyticsClick
  });
}

export default withRouter(
  connect(mapStateToProps, {
    ...actions,
    ...fetchActions
  })(CountryLtsOverviewContainer)
);
