import Component from './ndcs-enhancements-2025-tracker-chart-component';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { actions as modalActions } from 'components/modal-metadata';
import { actions as pngModalActions } from 'components/modal-png-download';
import { createElement } from 'react';
import {getMetadata} from './ndcs-enhancements-2025-chart-selectors'

const actions = { ...modalActions, ...pngModalActions };

const mapStateToProps = (state) => {
  const { data, loading } = state.ndcsExplore;
  const ndcsExploreWithSelection = {
    ...state,
    ...data,
  };
  return {
    metadata: getMetadata(ndcsExploreWithSelection)
  };
}

const pngDownloadId = 'ndcs-enhancements-map';

function NDCSExploreMapContainer(props) {
  const {
    setModalMetadata,
    setModalPngDownload
  } = props;

  const handlePngDownloadModal = () => {
    setModalPngDownload({ open: pngDownloadId });
  }
  const handleInfoClick = () => {
    setModalMetadata({
      category: 'NDC Content Map',
      slugs: '2020_NDC',
      open: true
    });
  }
  return createElement(Component, {
      ...props,
      pngDownloadId,
      handleInfoClick,
      handlePngDownloadModal,
  });
}

NDCSExploreMapContainer.propTypes = {
  setModalMetadata: PropTypes.func.isRequired,
  setModalPngDownload: PropTypes.func.isRequired,
  summaryData: PropTypes.array,
  selectedCategory: PropTypes.object,
};

export default withRouter(
  connect(mapStateToProps, actions)(NDCSExploreMapContainer)
);