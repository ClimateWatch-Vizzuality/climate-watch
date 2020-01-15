import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/button';
import Icon from 'components/icon';
import uniq from 'lodash/uniq';
import cx from 'classnames';
import shareIcon from 'assets/icons/share.svg';
import ModalHeader from 'components/modal/modal-header-component';
import Modal from 'components/modal/modal-component';
import { NavLink } from 'react-router-dom';
import checkIcon from 'assets/icons/check.svg';
import downloadIcon from 'assets/icons/download.svg';
import { handleAnalytics } from 'utils/analytics';
import styles from './share-button-styles.scss';

function ShareButton({
  className,
  shareMenuOptions,
  analyticsName,
  withDownloadIcon
}) {
  const [isOpen, setOpen] = useState(false);
  const [succesfulActions, setSuccesfulActions] = useState([]);

  useEffect(() => {
    if (!isOpen && succesfulActions.length) {
      setSuccesfulActions([]);
    }
  }, [succesfulActions, isOpen]);

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
    setOpen(false);
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
    <React.Fragment>
      <Button
        className={cx(styles.shareButton, className)}
        onClick={() => setOpen(true)}
        variant="primary"
        dataFor="info-tooltip"
        dataTip="Sharermation"
      >
        <Icon icon={shareIcon} />
        <span className={styles.shareText}>Share</span>
      </Button>
      <Modal
        isOpen={isOpen}
        theme={{ modal: styles.modal, modalContent: styles.modalContent }}
        onRequestClose={() => setOpen(false)}
        header={<ModalHeader title="Share" />}
      >
        <ul className={styles.links}>
          {shareMenuOptions.map(option => (
            <li className={styles.linkContainer} key={option.label}>
              {renderLink(option)}
            </li>
          ))}
        </ul>
      </Modal>
    </React.Fragment>
  );
}

ShareButton.propTypes = {
  className: PropTypes.node,
  shareMenuOptions: PropTypes.array,
  withDownloadIcon: PropTypes.bool,
  analyticsName: PropTypes.string
};

export default ShareButton;
