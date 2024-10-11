import { createElement } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { actions as modalActions } from 'components/modal-metadata';
import { actions as pngModalActions } from 'components/modal-png-download';
import { handleAnalytics } from 'utils/analytics';
import Component from './ndcs-enhancements-2025-tracker-chart-component';
import { getData, getMetadata } from './ndcs-enhancements-2025-chart-selectors';

const actions = { ...modalActions, ...pngModalActions };

const mapStateToProps = state => ({
  data: getData(state),
  metadata: getMetadata(state)
});

const pngDownloadId = 'ndcs-enhancements-map';

function Ndc2025TrackerChartContainer(props) {
  const { setModalMetadata, setModalPngDownload } = props;

  const handlePngDownloadModal = () => {
    setModalPngDownload({ open: pngDownloadId });
  };
  const handleInfoClick = () => {
    setModalMetadata({
      category: 'NDC Content Map',
      slugs: '2025_NDC',
      open: true
    });
  };

  const handleAnalyticsClick = () => {
    handleAnalytics('NDC 2025 tracker', 'Leave page to explore data');
  };

  return createElement(Component, {
    ...props,
    pngDownloadId,
    handleInfoClick,
    handlePngDownloadModal,
    handleAnalyticsClick
  });
}

Ndc2025TrackerChartContainer.propTypes = {
  setModalMetadata: PropTypes.func.isRequired,
  setModalPngDownload: PropTypes.func.isRequired,
  summaryData: PropTypes.array,
  selectedCategory: PropTypes.object
};

export default withRouter(
  connect(mapStateToProps, actions)(Ndc2025TrackerChartContainer)
);
