import React, { PureComponent } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
import Button from 'components/button';
import Icon from 'components/icon';
import closeIcon from 'assets/icons/sidebar-close.svg';
import cx from 'classnames';
import { isMicrosoftBrowser } from 'utils';
import styles from './modal-styles.scss';

class CustomModal extends PureComponent {
  componentWillMount() {
    Modal.setAppElement('body');
  }
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      isOpen,
      customStyles,
      contentLabel,
      onRequestClose,
      header,
      children,
      shouldCloseOnOverlayClick,
      theme
    } = this.props;
    const defaultStyles = {
      overlay: {
        zIndex: 23,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 5px 15px 0 rgba(71, 44, 184, 0.1)',
        backgroundColor: 'rgba(17, 55, 80, 0.4)',
        overflow: 'hidden'
      }
    };
    const modalStyles = { ...defaultStyles, ...customStyles };
    const isMicrosoftBrowserTest = isMicrosoftBrowser();

    return (
      <Modal
        className={cx(theme.modal, 'modal', {
          [theme.microsoftBrowserModal]: isMicrosoftBrowserTest
        })}
        style={modalStyles}
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel={contentLabel}
        shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      >
        {header}
        <Button
          onClick={() => onRequestClose()}
          className={theme.closeBtn}
          square
        >
          <Icon icon={closeIcon} className={theme.close} />
        </Button>
        <div
          className={cx(theme.modalContent, {
            [theme.microsoftBrowserModalContent]: isMicrosoftBrowserTest
          })}
        >
          {children}
        </div>
      </Modal>
    );
  }
}

CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  shouldCloseOnOverlayClick: PropTypes.bool.isRequired,
  contentLabel: PropTypes.string,
  customStyles: PropTypes.object,
  children: PropTypes.node,
  header: PropTypes.node.isRequired,
  theme: PropTypes.object,
  onRequestClose: PropTypes.func.isRequired
};

CustomModal.defaultProps = {
  contentLabel: 'Modal content',
  shouldCloseOnOverlayClick: true
};

export default themr('CustomModal', styles)(CustomModal);
