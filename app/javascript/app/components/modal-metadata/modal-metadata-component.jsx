import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal, { ModalHeader } from 'components/modal';
import Loading from 'components/loading';
import NoContent from 'components/no-content';

import styles from './modal-metadata-styles.scss';

class ModalMetadata extends PureComponent {
  getContent() {
    if (this.props.loading) return <Loading />;
    if (!this.props.data) return <NoContent />;

    const {
      link,
      sourceOrganization,
      summary,
      description,
      date
    } = this.props.data;

    return (
      <div className={styles.textContainer}>
        {sourceOrganization && (
          <p className={styles.text}>
            <span className={styles.textHighlight}>Source organization: </span>
            {sourceOrganization}
            {date && <span className={styles.text}>({date})</span>}
          </p>
        )}
        {summary && (
          <p className={styles.text}>
            <span className={styles.textHighlight}>Summary: </span>
            {summary}
          </p>
        )}
        {description && (
          <p className={styles.text}>
            <span className={styles.textHighlight}>Description: </span>
            {description}
          </p>
        )}
        {link && (
          <p className={styles.text}>
            <span className={styles.textHighlight}>Read more: </span>
            <a key="link" className={styles.link} href={link}>
              {' '}
              {link}{' '}
            </a>
          </p>
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
