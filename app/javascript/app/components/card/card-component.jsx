import React, { PureComponent } from 'react';
import cx from 'classnames';
import { themr } from 'react-css-themr';
import PropTypes from 'prop-types';

import styles from './card-styles.scss';

class Card extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { title, children, theme, className } = this.props;
    return (
      <div className={cx(className, theme.card)}>
        <div className={theme.data}>{children}</div>
        <div className={theme.info}>{title}</div>
      </div>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  theme: PropTypes.object,
  children: PropTypes.node
};

export default themr('Card', styles)(Card);
