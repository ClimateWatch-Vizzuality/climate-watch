import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal, { ModalHeader } from 'components/modal';
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
  getContent() {
    if (this.props.loading) {
      return <Loading className={styles.loadingContainer} />;
    }
    if (!this.props.data) return <NoContent />;
    if (this.props.data === 'error') {
      return <NoContent message="There was an error getting the metadata" />;
    }
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
    } = this.props.data;

    return (
      <div className={styles.textContainer}>
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

  render() {
    const { onRequestClose, isOpen, title } = this.props;
    return (
      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        {title && <ModalHeader title={title} />}
        {this.getContent()}
      </Modal>
    );
  }
}

ModalMetadata.propTypes = {
  title: PropTypes.string,
  data: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default ModalMetadata;
