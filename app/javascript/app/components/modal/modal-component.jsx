import React, { PureComponent } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import Button from 'components/button';
import Icon from 'components/icon';

import closeIcon from 'assets/icons/sidebar-close.svg';
import styles from './modal-styles.scss';

class CustomModal extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      isOpen,
      onRequestClose,
      defaultStyles,
      customStyles,
      contentLabel,
      children
    } = this.props;
    const modalStyles = { ...defaultStyles, ...customStyles };
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={modalStyles}
        contentLabel={contentLabel}
      >
        <Button onClick={onRequestClose} className={styles.closeBtn} square>
          <Icon icon={closeIcon} className={styles.close} />
        </Button>
        {children}
      </Modal>
    );
  }
}

CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  contentLabel: PropTypes.string,
  customStyles: PropTypes.object,
  defaultStyles: PropTypes.object,
  children: PropTypes.node
};

CustomModal.defaultProps = {
  contentLabel: 'Modal content',
  defaultStyles: {
    overlay: {
      zIndex: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 5px 15px 0 rgba(71, 44, 184, 0.1)',
      backgroundColor: 'rgba(17, 55, 80, 0.4)'
    },
    content: {
      position: 'relative',
      top: 'auto',
      left: 'auto',
      right: 'auto',
      bottom: 'auto',
      width: '770px',
      padding: '35px 40px',
      maxHeight: '640px',
      height: 'calc(100vh - 100px)',
      border: 'none',
      borderRadius: 0
    }
  }
};

export default CustomModal;
