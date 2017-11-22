import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/modal/modal-component';
import ModalHeader from 'components/modal/modal-header-component';
import Loading from 'components/loading';
import NoContent from 'components/no-content';

import styles from './modal-metadata-styles.scss';

const MetadataProp = ({ title, children }) => (
  <p className={styles.text}>
    <span className={styles.textHighlight}>{title}: </span>
    {children}
  </p>
);

MetadataProp.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
};

class ModalMetadata extends PureComponent {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0
    };
    this.handleOnRequestClose = this.handleOnRequestClose.bind(this);
  }

  getContent() {
    const { data, loading } = this.props;

    if (loading) {
      return <Loading className={styles.loadingContainer} />;
    }
    if (!data) return <NoContent />;
    if (data === 'error') {
      return <NoContent message="There was an error getting the metadata" />;
    }

    const selectedIndexData = data[this.state.selectedIndex];
    const {
      learn_more_link,
      source_organization,
      technical_title,
      summary,
      citation,
      cautions,
      geographic_coverage,
      description,
      date_of_content,
      summary_of_licenses,
      terms_of_service_link
    } = selectedIndexData;

    return (
      <div key={selectedIndexData.source} className={styles.textContainer}>
        {technical_title && (
          <MetadataProp title="Title">{technical_title}</MetadataProp>
        )}
        {date_of_content && (
          <MetadataProp title="Date of content">{date_of_content}</MetadataProp>
        )}
        {source_organization && (
          <MetadataProp title="Source organization">
            {source_organization}
          </MetadataProp>
        )}
        {summary && <MetadataProp title="Summary">{summary}</MetadataProp>}
        {description && (
          <MetadataProp title="Description">{description}</MetadataProp>
        )}
        {geographic_coverage && (
          <MetadataProp title="Geographic Coverage">
            {geographic_coverage}
          </MetadataProp>
        )}
        {cautions && <MetadataProp title="Cautions">{cautions}</MetadataProp>}
        {learn_more_link && (
          <MetadataProp title="Read more">
            <a key="link" className={styles.link} href={learn_more_link}>
              {' '}
              {learn_more_link}{' '}
            </a>
          </MetadataProp>
        )}
        {summary_of_licenses && (
          <MetadataProp title="Summary of licenses">
            {summary_of_licenses}
          </MetadataProp>
        )}
        {citation && <MetadataProp title="Citation">{citation}</MetadataProp>}
        {terms_of_service_link && (
          <MetadataProp title="Terms of service link">
            <a key="link" className={styles.link} href={terms_of_service_link}>
              {' '}
              {terms_of_service_link}{' '}
            </a>
          </MetadataProp>
        )}
      </div>
    );
  }

  handleOnRequestClose() {
    this.setState({ selectedIndex: 0 });
    this.props.onRequestClose();
  }

  render() {
    const { isOpen, title, tabTitles } = this.props;
    return (
      <Modal isOpen={isOpen} onRequestClose={this.handleOnRequestClose}>
        {title && (
          <ModalHeader
            title={title}
            tabTitles={tabTitles}
            selectedIndex={this.state.selectedIndex}
            handleTabIndexChange={i => this.setState({ selectedIndex: i })}
          />
        )}
        {this.getContent()}
      </Modal>
    );
  }
}

ModalMetadata.propTypes = {
  title: PropTypes.string,
  tabTitles: PropTypes.array,
  data: PropTypes.array,
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default ModalMetadata;
