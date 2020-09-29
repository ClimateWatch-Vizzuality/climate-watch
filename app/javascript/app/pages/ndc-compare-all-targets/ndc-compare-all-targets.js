import { createElement } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';
import { actions as modalMetadataActions } from 'components/modal-metadata';
import NDCCompareAllComponent from './ndc-compare-all-targets-component';

import {
  getRemoveISOfromData,
  getColumns,
  getLoading,
  getSearch,
  getSelectedTargets,
  getSelectedTableTargets,
  getTitleLinks,
  getQuery,
  getCountryIsos
} from './ndc-compare-all-targets-selectors';

const mapStateToProps = (state, { location }) => {
  const search = qs.parse(location.search);
  return {
    loading: getLoading(state),
    query: getSearch(state, { search }),
    tableData: getRemoveISOfromData(state, { search }),
    columns: getColumns(state, {
      search
    }),
    selectedTargets: getSelectedTargets(state, { search }),
    selectedTableTargets: getSelectedTableTargets(state, { search }),
    titleLinks: getTitleLinks(state, { search }),
    countryIsos: getCountryIsos(state, { search }),
    queryParams: getQuery(state, { search })
  };
};

const NDCCompareAllContainer = props => {
  const { history, location, query, tableData } = props;

  const updateUrlParam = (param, clear) => {
    history.replace(getLocationParamUpdated(location, param, clear));
  };

  const handleSearchChange = value => {
    updateUrlParam({
      name: 'search',
      value
    });
  };

  const handleTargetsChange = value => {
    updateUrlParam({
      name: 'targets',
      value: value ? value.toString() : undefined
    });
  };

  const handleInfoClick = () => {
    // TODO: Missing pledges slug
    props.setModalMetadata({
      category: 'Compare all targets',
      slugs: [
        'ndc_cw',
        'ndc_wb',
        'ndc_die',
        'ndc_lts',
        'national_laws_politices'
      ],
      customTitle: 'Compare all targets',
      open: true
    });
  };

  const noContentMsg = query ? 'No data for this search' : 'No data';

  return createElement(NDCCompareAllComponent, {
    ...props,
    noContentMsg,
    handleSearchChange,
    tableData,
    handleTargetsChange,
    handleInfoClick
  });
};

NDCCompareAllContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  tableData: PropTypes.array,
  columns: PropTypes.array,
  query: PropTypes.string
};

export default withRouter(
  connect(mapStateToProps, modalMetadataActions)(NDCCompareAllContainer)
);
