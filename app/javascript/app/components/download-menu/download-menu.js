import { connect } from 'react-redux';
import { createElement, PureComponent } from 'react';
import { getStorageWithExpiration } from 'utils/localStorage';
import PropTypes from 'prop-types';

import { actions } from 'components/modal-download';

import Component from './download-menu-component';

const mapStateToProps = ({ modalDownload }) => ({
  isOpen: modalDownload.isOpen
});

class DownloadMenuContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { downloadMenuOptions: [] };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch('/api/v1/zip_files')
      .then(response => {
        if (response.ok) return response.json();
        throw Error(response.statusText);
      })
      .then(response => {
        const downloadMenuOptions = response.data.map(d => ({
          label: `${d.dropdown_title} (${d.size})`,
          action: this.handleOnClick.bind(this, d.url, d.size)
        }));

        this.setState({ downloadMenuOptions });
      })
      .catch(error => {
        console.warn(error);
      });
  }

  handleOnClick = (downloadUrl, size) => {
    const downloadAction = () => window.location.assign(downloadUrl);

    if (getStorageWithExpiration('userSurvey')) {
      return downloadAction();
    }

    return this.props.setModalDownloadParams({
      open: true,
      downloadAction,
      size
    });
  };

  render() {
    const { downloadMenuOptions } = this.state;

    return createElement(Component, {
      ...this.props,
      downloadMenuOptions
    });
  }
}

DownloadMenuContainer.propTypes = {
  setModalDownloadParams: PropTypes.func.isRequired
};

export default connect(mapStateToProps, actions)(DownloadMenuContainer);
