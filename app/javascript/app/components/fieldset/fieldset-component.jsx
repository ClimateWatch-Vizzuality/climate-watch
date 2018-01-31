import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import styles from './fieldset-styles';

const Fieldset = ({ failed, failMessage, children }) => (
  <div
    className={cx(styles.fieldsetContainer, {
      [styles.fieldsetContainerFailed]: failed
    })}
  >
    {children}
    <span
      className={cx(styles.fieldsetFailMessage, {
        [styles.fieldsetFailMessageFailed]: failed
      })}
    >
      {failMessage}
    </span>
  </div>
);

Fieldset.propTypes = {
  children: PropTypes.object.isRequired,
  failed: PropTypes.bool,
  failMessage: PropTypes.string
};

export default Fieldset;
