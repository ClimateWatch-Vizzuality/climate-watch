import React, { PureComponent } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import cx from 'classnames';

import ModalHeader from './modal-header-component';
import styles from './modal-styles.scss';

class CustomModal extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { isOpen, customStyles, contentLabel, children } = this.props;
    return (
      <Modal isOpen={isOpen} style={customStyles} contentLabel={contentLabel}>
        <ModalHeader {...this.props} />
        <ModalHeader {...this.props} fakeHeaderForSpacing />
        <div className={cx(styles.content)}>{children}</div>
      </Modal>
    );
  }
}

CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  contentLabel: PropTypes.string,
  tabTitles: PropTypes.array,
  customStyles: PropTypes.object,
  children: PropTypes.node
};

CustomModal.defaultProps = {
  contentLabel: 'Modal content',
  customStyles: {
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
