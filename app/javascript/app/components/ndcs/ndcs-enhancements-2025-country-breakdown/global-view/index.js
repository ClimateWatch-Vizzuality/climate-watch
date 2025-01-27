import { createElement } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { actions as modalActions } from 'components/modal-metadata';
import { actions as pngModalActions } from 'components/modal-png-download';

import { getData, getMetadata } from './selectors';
import Component from './component';

const pngDownloadId = 'iconic-global-chart';

const actions = { ...modalActions, ...pngModalActions };

const mapStateToProps = state => ({
  data: getData(state),
  metadata: getMetadata(state)
});

function GlobalViewContainer(props) {
  const { setModalMetadata, setModalPngDownload } = props;

  const handleInfoClick = () => {
    setModalMetadata({
      category: 'NDC Content Map',
      slugs: '2025_NDC',
      open: true
    });
  };

  const handlePngDownloadModal = () => {
    setModalPngDownload({ open: pngDownloadId });
  };

  return createElement(Component, {
    ...props,
    pngDownloadId,
    handleInfoClick,
    handlePngDownloadModal
  });
}

export const chartConfigPropTypes = {
  chartId: PropTypes.string.isRequired,
  options: {
    conditionalNdc: PropTypes.bool.isRequired
  },
  data: PropTypes.object.isRequired,
  scales: PropTypes.shape({
    x: PropTypes.func.isRequired,
    y: PropTypes.func.isRequired
  }),
  dimensions: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }),
  margins: PropTypes.shape({
    top: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired
  })
};

GlobalViewContainer.propTypes = {};

export default withRouter(
  connect(mapStateToProps, actions)(GlobalViewContainer)
);
