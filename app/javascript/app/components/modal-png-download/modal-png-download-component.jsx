import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/modal/modal-component';
import ModalHeader from 'components/modal/modal-header-component';

const modalPngDownloadComponent = ({
  isOpen,
  header,
  description,
  onRequestClose
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    header={<ModalHeader title={header} />}
  >
    <div>{description}</div>
    <div>THE CHART</div>
  </Modal>
);

modalPngDownloadComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  header: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onRequestClose: PropTypes.func.isRequired
};

export default modalPngDownloadComponent;
