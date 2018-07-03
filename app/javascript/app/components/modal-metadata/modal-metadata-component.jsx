import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CustomModal from 'components/modal/modal-component';
import ModalHeader from 'components/modal/modal-header-component';
import MetadataText from 'components/metadata-text';
import Loading from 'components/loading';
import NoContent from 'components/no-content';

import styles from './modal-metadata-styles.scss';

class ModalMetadata extends PureComponent {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0
    };
    this.handleOnRequestClose = this.handleOnRequestClose.bind(this);
  }

  getContent() {
    const { data, loading, disclaimerConfig } = this.props;
    if (loading) {
      return <Loading className={styles.loadingContainer} />;
    }
    if (!data) return <NoContent />;
    if (data === 'error') {
      return <NoContent message="There was an error getting the metadata" />;
    }

    const selectedIndexData = data[this.state.selectedIndex];
    return (
      <MetadataText
        data={selectedIndexData}
        disclaimerConfig={disclaimerConfig}
      />
    );
  }

  handleOnRequestClose() {
    this.setState({ selectedIndex: 0 });
    this.props.onRequestClose();
  }

  render() {
    const { isOpen, title, tabTitles } = this.props;
    return (
      <CustomModal
        onRequestClose={this.handleOnRequestClose}
        isOpen={isOpen}
        header={
          <ModalHeader
            selectedIndex={this.state.selectedIndex}
            handleTabIndexChange={i => this.setState({ selectedIndex: i })}
            title={title}
            tabTitles={tabTitles}
          />
        }
      >
        {this.getContent()}
      </CustomModal>
    );
  }
}

ModalMetadata.propTypes = {
  title: PropTypes.string,
  tabTitles: PropTypes.array,
  data: PropTypes.array,
  disclaimerConfig: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default ModalMetadata;
