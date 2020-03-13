import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/modal/modal-component';
import ModalHeader from 'components/modal/modal-header-component';
import Icon from 'components/icon';
import uniq from 'lodash/uniq';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';
import checkIcon from 'assets/icons/check.svg';
import downloadIcon from 'assets/icons/download.svg';
import { handleAnalytics } from 'utils/analytics';
import styles from './modal-share-styles.scss';

const ModalShare = ({
  isModalOpen,
  shareMenuOptions,
  closeModal,
  analyticsName,
  withDownloadIcon
}) => {
  const [succesfulActions, setSuccesfulActions] = useState([]);
  useEffect(() => {
    if (!isModalOpen && succesfulActions.length) {
      setSuccesfulActions([]);
    }
  }, [succesfulActions, isModalOpen]);

  const handleAnalyticsClick = () => {
    if (analyticsName) {
      handleAnalytics('Share', 'User shares a link', analyticsName);
    }
  };

  const handleActionClick = option => {
    option.action();
    const updatedActions = uniq(succesfulActions.concat(option.label));
    setSuccesfulActions(updatedActions);
    handleAnalyticsClick();
  };

  const handleLinkClick = () => {
    closeModal();
    handleAnalyticsClick();
  };

  const renderInsideLink = (option, withAction = false) => (
    <div
      className={cx(styles.documentLink, {
        [styles.withDownloadIcon]: withDownloadIcon
      })}
      key={option.label}
    >
      {option.icon &&
        (withAction && succesfulActions.includes(option.label) ? (
          <Icon icon={checkIcon} className={styles.icon} />
        ) : (
          <Icon icon={option.icon} className={styles.icon} />
        ))}
      <span className={styles.title}>{option.label}</span>
      {withDownloadIcon && <Icon icon={downloadIcon} className={styles.icon} />}
    </div>
  );

  const renderLink = option => {
    if (option.path) {
      return (
        <NavLink
          className={styles.link}
          activeClassName={styles.active}
          to={option.path}
          onClick={handleLinkClick}
        >
          {renderInsideLink(option)}
        </NavLink>
      );
    }
    return option.action ? (
      <button className={styles.link} onClick={() => handleActionClick(option)}>
        {renderInsideLink(option, true)}
      </button>
    ) : (
      <a
        className={styles.link}
        target={option.target || '_blank'}
        href={option.link}
        onClick={handleLinkClick}
      >
        {renderInsideLink(option)}
      </a>
    );
  };
  return (
    <Modal
      isOpen={isModalOpen}
      theme={{ modal: styles.modal, modalContent: styles.modalContent }}
      onRequestClose={() => closeModal()}
      header={<ModalHeader title="Share" />}
    >
      {shareMenuOptions.map(({ key, options }) => (
        <ul className={styles.links} key={key}>
          {options.map(option => (
            <li className={styles.linkContainer} key={option.label}>
              {renderLink(option)}
            </li>
          ))}
        </ul>
      ))}
    </Modal>
  );
};

ModalShare.propTypes = {
  isModalOpen: PropTypes.bool,
  shareMenuOptions: PropTypes.array,
  withDownloadIcon: PropTypes.bool,
  analyticsName: PropTypes.string,
  closeModal: PropTypes.func.isRequired
};

export default ModalShare;
