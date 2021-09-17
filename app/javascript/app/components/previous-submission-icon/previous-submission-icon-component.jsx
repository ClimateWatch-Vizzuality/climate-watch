import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import enhancementIconWhite from 'assets/icons/enhancement/icon-w-enhancement.png';
import noPreviousIconWhite from 'assets/icons/enhancement/icon-w-no-previous.png';
import noDocumentIconWhite from 'assets/icons/enhancement/icon-w-no-document.png';
import noEnhancementIconWhite from 'assets/icons/enhancement/icon-w-no-enhancement.png';
import noRevisionIconWhite from 'assets/icons/enhancement/icon-w-no-revision.png';
import unclearIconWhite from 'assets/icons/enhancement/icon-w-unclear.png';
import enhancementIcon from 'assets/icons/enhancement/icon-enhancement.png';
import noPreviousIcon from 'assets/icons/enhancement/icon-no-previous.png';
import noDocumentIcon from 'assets/icons/enhancement/icon-no-document.png';
import noEnhancementIcon from 'assets/icons/enhancement/icon-no-enhancement.png';
import noRevisionIcon from 'assets/icons/enhancement/icon-no-revision.png';
import unclearIcon from 'assets/icons/enhancement/icon-unclear.png';
import styles from './previous-submission-icon-styles.scss';

const icons = {
  white: {
    'Revised NDC compared with previous version': enhancementIconWhite,
    'Yes, enhancement in the revised submission': enhancementIconWhite,
    'No, no enhancement in the revised submission': noEnhancementIconWhite,
    Unclear: unclearIconWhite,
    'No revision compared with previous version': noRevisionIconWhite,
    'No previous submission available': noPreviousIconWhite,
    'No Document Submitted"': noDocumentIconWhite
  },
  color: {
    'Revised NDC compared with previous version': enhancementIcon,
    'Yes, enhancement in the revised submission': enhancementIcon,
    'No, no enhancement in the revised submission': noEnhancementIcon,
    Unclear: unclearIcon,
    'No revision compared with previous version': noRevisionIcon,
    'No previous submission available': noPreviousIcon,
    'No Document Submitted"': noDocumentIcon
  }
};

const PreviousSubmissionIcon = ({ value, white, className, tooltipId }) => {
  const icon = icons[white ? 'white' : 'color'][value];
  if (!icon) return null;
  return (
    <img
      className={cx(styles.icon, className)}
      src={icon}
      alt={value}
      {...(tooltipId && { 'data-for': tooltipId, 'data-tip': value })}
    />
  );
};

PreviousSubmissionIcon.propTypes = {
  value: PropTypes.string.isRequired,
  white: PropTypes.bool,
  tooltipId: PropTypes.string,
  className: PropTypes.string
};

export default PreviousSubmissionIcon;
