import { connect } from 'react-redux';
import { createElement, PureComponent } from 'react';
import { getStorageWithExpiration } from 'utils/localStorage';
import PropTypes from 'prop-types';

import { actions } from 'components/modal-download';

import Component from './download-menu-component';

const FEATURE_DATA_SURVEY = process.env.FEATURE_DATA_SURVEY === 'true';
const { S3_BUCKET_NAME } = process.env;
const { CW_FILES_PREFIX } = process.env;

const server = `http://${S3_BUCKET_NAME}.s3.amazonaws.com`;
const folder = `${CW_FILES_PREFIX}climate-watch-download-zip`;
const url = `${server}${folder}`;

const downloadMenuOptions = [
  {
    label: 'All data (62 MB)',
    link: `${url}/all.zip`,
    target: '_self'
  },
  {
    label: 'NDC Content (6.4 MB)',
    link: `${url}/ndc-content.zip`,
    target: '_self'
  },
  {
    label: 'NDC Targets (329 KB)',
    link: `${url}/NDC_quantification.zip`,
    target: '_self'
  },
  {
    label: 'NDC Text in HTML (53 MB)',
    link: `${url}/NDC_text_HTML.zip`,
    target: '_self'
  },
  {
    label: 'GHG emissions (3.5 MB)',
    link: `${url}/ghg-emissions.zip`,
    target: '_self'
  },
  {
    label: 'Adaptation (357 kB)',
    link: `${url}/adaptation.zip`,
    target: '_self'
  },
  {
    label: 'Socioeconomic (450 kB)',
    link: `${url}/socioeconomic-indicators.zip`,
    target: '_self'
  },
  {
    label: 'Pathways (2.1 MB)',
    link: `${url}/pathways.zip`,
    target: '_self'
  }
];

const mapStateToProps = ({ modalDownload }) => ({
  isOpen: modalDownload.isOpen
});

class DownloadMenuContainer extends PureComponent {
  handleOnClick = (downloadUrl, size) => {
    if (getStorageWithExpiration('userSurvey')) {
      return window.location.assign(downloadUrl);
    }

    return this.props.setModalDownloadParams({
      open: true,
      downloadUrl,
      size
    });
  };

  downloadMenuOptionsWithSurvey = [
    {
      label: 'All data (62 MB)',
      action: this.handleOnClick.bind(this, `${url}/all.zip`, '62 MB')
    },
    {
      label: 'NDC Content (6.4 MB)',
      action: this.handleOnClick.bind(this, `${url}/ndc-content.zip`, '6.4 MB')
    },
    {
      label: 'NDC Targets (329 kB)',
      action: this.handleOnClick.bind(
        this,
        `${url}/NDC_quantification.zip`,
        '329 kB'
      )
    },
    {
      label: 'NDC Text in HTML (53 MB)',
      action: this.handleOnClick.bind(this, `${url}/NDC_text_HTML.zip`, '53 MB')
    },
    {
      label: 'GHG emissions (3.5 MB)',
      action: this.handleOnClick.bind(
        this,
        `${url}/ghg-emissions.zip`,
        '3.5 MB'
      )
    },
    {
      label: 'Adaptation (357 kB)',
      action: this.handleOnClick.bind(this, `${url}/adaptation.zip`, '357 kB')
    },
    {
      label: 'Socioeconomic (450 kB)',
      action: this.handleOnClick.bind(
        this,
        `${url}/socioeconomic-indicators.zip`,
        '450 kB'
      )
    },
    {
      label: 'Pathways (2.1 MB)',
      action: this.handleOnClick.bind(this, `${url}/pathways.zip`, '2.1 MB')
    }
  ];

  render() {
    return createElement(Component, {
      ...this.props,
      downloadMenuOptions: FEATURE_DATA_SURVEY
        ? this.downloadMenuOptionsWithSurvey
        : downloadMenuOptions
    });
  }
}

DownloadMenuContainer.propTypes = {
  setModalDownloadParams: PropTypes.func.isRequired
};

export default connect(mapStateToProps, actions)(DownloadMenuContainer);
