import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import enhancementIconWhite from 'assets/icons/enhancement/icon-w-enhancement.png';
import noEnhancementIconWhite from 'assets/icons/enhancement/icon-w-no-enhancement.png';
import unclearIconWhite from 'assets/icons/enhancement/icon-w-unclear.png';
import missingIconWhite from 'assets/icons/enhancement/icon-w-missing.png';
import enhancementIcon from 'assets/icons/enhancement/icon-enhancement.png';
import noEnhancementIcon from 'assets/icons/enhancement/icon-no-enhancement.png';
import unclearIcon from 'assets/icons/enhancement/icon-unclear.png';
import missingIcon from 'assets/icons/enhancement/icon-missing.png';

import { SUBMISSION_ICON_VALUE } from 'data/country-documents';

import styles from './previous-submission-icon-styles.scss';

const icons = {
  white: {
    'Revised NDC compared with previous version': enhancementIconWhite,
    'Yes, enhancement in the revised submission': enhancementIconWhite,
    'No, no enhancement in the revised submission': noEnhancementIconWhite,
    Unclear: unclearIconWhite,
    'No revision compared with previous version': missingIconWhite,
    'No previous submission available': missingIconWhite,
    'No Document Submitted': missingIconWhite
  },
  color: {
    'Revised NDC compared with previous version': enhancementIcon,
    'Yes, enhancement in the revised submission': enhancementIcon,
    'No, no enhancement in the revised submission': noEnhancementIcon,
    Unclear: unclearIcon,
    'No revision compared with previous version': missingIcon,
    'No previous submission available': missingIcon,
    'No Document Submitted': missingIcon,
    // Submission icon
    [SUBMISSION_ICON_VALUE.yes]: enhancementIcon,
    [SUBMISSION_ICON_VALUE.no]: noEnhancementIcon,
    [SUBMISSION_ICON_VALUE.intends]: missingIcon,
    // Adaptation
    'Adaptation Included': enhancementIcon,
    'Adaptation Not Included': noEnhancementIcon,
    Mentioned: enhancementIcon,
    'Not Specified': unclearIcon
  }
};

const PreviousSubmissionIcon = ({
  value,
  submissionIconValue,
  white,
  className,
  tooltipId
}) => {
  const iconValue = submissionIconValue || value;
  const icon = icons[white ? 'white' : 'color'][iconValue];
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
  submissionIconValue: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  white: PropTypes.bool,
  tooltipId: PropTypes.string,
  className: PropTypes.string
};

export default PreviousSubmissionIcon;
