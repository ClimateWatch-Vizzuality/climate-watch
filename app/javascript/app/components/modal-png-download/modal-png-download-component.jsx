import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/modal/modal-component';
import ModalHeader from 'components/modal/modal-header-component';
import Button from 'components/button';
import Icon from 'components/icon';
import cwLogo from 'assets/icons/cw-logo.svg';
import styles from './modal-png-download-styles';

const modalPngDownloadComponent = ({
  isOpen,
  header,
  children,
  title,
  selectionSubtitle,
  onRequestClose,
  handlePngDownload
}) => {
  const modalContentRef = useRef();
  return (
    <Modal
      theme={styles}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      header={<ModalHeader title={header} />}
    >
      <div ref={modalContentRef}>
        <Icon className={styles.logo} icon={cwLogo} />
        <div className={styles.title}>{title}</div>
        <div className={styles.chartParamsWrapper}>
          {selectionSubtitle && (
            <span className={styles.chartParams}>{selectionSubtitle}</span>
          )}
        </div>
        <div className={styles.chartWrapper}>{children}</div>
      </div>
      <Button
        className={styles.saveButton}
        onClick={() => {
          handlePngDownload(modalContentRef.current);
        }}
        variant="primary"
      >
        <span className={styles.shareText}>Save</span>
      </Button>
    </Modal>
  );
};

modalPngDownloadComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  header: PropTypes.string.isRequired,
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  selectionSubtitle: PropTypes.string,
  onRequestClose: PropTypes.func.isRequired,
  handlePngDownload: PropTypes.func.isRequired
};

export default modalPngDownloadComponent;
