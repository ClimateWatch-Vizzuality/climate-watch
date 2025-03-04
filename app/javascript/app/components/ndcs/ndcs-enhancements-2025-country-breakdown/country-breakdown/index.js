import { createElement } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { actions as modalActions } from 'components/modal-metadata';
import { actions as pngModalActions } from 'components/modal-png-download';

import { getData } from './selectors';
import Component from './component';

const mapStateToProps = state => ({
  data: getData(state)
});

const pngDownloadId = 'iconic-country-breakdown-chart';

const actions = { ...modalActions, ...pngModalActions };

function CountryBreakdownContainer(props) {
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

export default withRouter(
  connect(mapStateToProps, actions)(CountryBreakdownContainer)
);
