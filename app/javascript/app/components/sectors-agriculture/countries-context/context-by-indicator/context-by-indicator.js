import { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import qs from 'query-string';
import { format } from 'd3-format';
import { isCountryIncluded } from 'app/utils';
import { handleAnalytics } from 'utils/analytics';
import { getLocationParamUpdated } from 'utils/navigation';
import { actions } from 'components/modal-metadata';
import { actions as pngModalActions } from 'components/modal-png-download';

import { countriesContexts } from './context-by-indicator-selectors';
import Component from './context-by-indicator-component';

const mapStateToProps = (state, { location, countries }) => {
  const search = qs.parse(location.search);
  const cc = { ...state, search, countries };
  return {
    ...countriesContexts(cc)
  };
};
const pngDownloadId = 'context-by-indicator';

class ContextByIndicatorContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      geometryIdHover: null,
      country: null
    };
  }

  // eslint-disable-next-line react/sort-comp
  indicatorValueFormat = (value, unit) => {
    if (!value) return 'No Data';
    if (unit.startsWith('%') || !unit) {
      return `${Math.round(value * 10) / 10} %`;
    }
    return `${format(',.2s')(value)} ${unit}`;
  };

  getTooltipText() {
    const { geometryIdHover } = this.state;
    const { mapData, selectedIndicator } = this.props;
    if (!geometryIdHover || !mapData || !selectedIndicator) return '';

    const countryData = mapData.find(c => c.iso === geometryIdHover);

    return (
      countryData &&
      this.indicatorValueFormat(countryData.value, selectedIndicator.unit)
    );
  }

  handleCountryEnter = geography => {
    const iso = geography.properties && geography.properties.id;
    if (iso) {
      this.setState({
        geometryIdHover: iso,
        country: geography.properties
      });
    }
  };

  handleCountryClick = geography => {
    const { isoCountries, indicatorSelectedYear } = this.props;
    const iso = geography.properties && geography.properties.id;
    if (iso && isCountryIncluded(isoCountries, iso)) {
      this.updateUrlParam([
        { name: 'contextBy', value: 'country' },
        { name: 'country', value: iso },
        { name: 'countryYear', value: indicatorSelectedYear.value }
      ]);
      handleAnalytics(
        'Agriculture Profile - Countries Context',
        'Use map to find country',
        geography.properties.name
      );
    }
  };

  handleInfoClick = () => {
    this.props.setModalMetadata({
      customTitle: 'Data Sources',
      category: 'Agriculture - Context by Indicator',
      slugs: [
        'FAOSTAT_2',
        'FAOSTAT_3',
        'WBD',
        'Aqueduct_Country_River_Basin_Rankings'
      ],
      open: true
    });
  };

  updateUrlParam = (params, clear) => {
    const { history, location } = this.props;
    history.push(getLocationParamUpdated(location, params, clear));
  };

  handlePngDownloadModal = () => {
    this.props.setModalPngDownload({ open: pngDownloadId });
  };

  render() {
    const tooltipTxt = this.getTooltipText();
    return createElement(Component, {
      ...this.props,
      tooltipTxt,
      pngDownloadId,
      handleCountryEnter: this.handleCountryEnter,
      handleCountryClick: this.handleCountryClick,
      handleInfoClick: this.handleInfoClick,
      handlePngDownloadModal: this.handlePngDownloadModal,
      countryData: this.state.country
    });
  }
}

ContextByIndicatorContainer.propTypes = {
  selectedIndicator: PropTypes.shape({}),
  mapData: PropTypes.arrayOf(PropTypes.shape({})),
  isoCountries: PropTypes.arrayOf(PropTypes.string),
  history: PropTypes.shape({}),
  indicatorSelectedYear: PropTypes.shape({}),
  location: PropTypes.shape({}),
  setModalMetadata: PropTypes.func,
  setModalPngDownload: PropTypes.func.isRequired
};

export default withRouter(
  connect(mapStateToProps, { ...actions, ...pngModalActions })(
    ContextByIndicatorContainer
  )
);
