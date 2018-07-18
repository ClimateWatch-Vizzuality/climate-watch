import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { actions } from 'components/modal-download';
import { PureComponent, createElement } from 'react';
import { PropTypes } from 'prop-types';
import { openDownloadModal } from 'utils/data-explorer';

import DataExplorer from './data-explorer-component';

const { S3_BUCKET_NAME } = process.env;

const server = `http://${S3_BUCKET_NAME}.s3.amazonaws.com`;
const folder = '/climate-watch-download-zip';

const mapStateToProps = (state, { route, location }) => ({
  navLinks: route.routes.filter(r => r.anchor).map(r => {
    const updatedR = r;
    updatedR.hash = location.hash;
    return updatedR;
  }),
  allDataDownloadHref: `${server}${folder}/all.zip`
});

class DataExplorerContainer extends PureComponent {
  handleDownloadModalOpen = () => {
    const { setModalDownloadParams, allDataDownloadHref } = this.props;
    openDownloadModal(allDataDownloadHref, setModalDownloadParams);
  };

  render() {
    return createElement(DataExplorer, {
      ...this.props,
      handleDownloadModalOpen: this.handleDownloadModalOpen
    });
  }
}

DataExplorerContainer.propTypes = {
  allDataDownloadHref: PropTypes.string,
  setModalDownloadParams: PropTypes.func
};

export default withRouter(
  connect(mapStateToProps, actions)(DataExplorerContainer)
);
