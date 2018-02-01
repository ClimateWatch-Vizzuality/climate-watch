import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
import cx from 'classnames';

import styles from './fieldset-styles';

const Fieldset = ({ failed, failMessage, className, theme, children }) => (
  <div
    className={cx(className, theme.fieldsetContainer, {
      [theme.fieldsetContainerFailed]: failed
    })}
  >
    <span
      className={cx(theme.fieldsetMessage, {
        [theme.fieldsetMessageFailed]: failed
      })}
    >
      {failMessage}
    </span>
    {React.Children.map(children, Child => cloneElement(Child, { failed }))}
  </div>
);

Fieldset.propTypes = {
  children: PropTypes.object.isRequired,
  theme: PropTypes.object,
  failed: PropTypes.bool,
  failMessage: PropTypes.string,
  className: PropTypes.string
};

export default themr('Fieldset', styles)(Fieldset);
