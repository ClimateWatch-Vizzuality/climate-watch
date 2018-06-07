import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Button from 'components/button';
import { Link } from 'react-router-dom';

import styles from './my-cw-placeholder-card-styles.scss';

class MyVisCard extends PureComponent {
  render() {
    const { text, action, className } = this.props;

    let Component;
    if (action.type === 'link') {
      Component = Link;
    } else {
      Component = Button;
    }
    return (
      <Component {...action} className={cx(styles.card, className)}>
        <p className={styles.cardTitle}>{text}</p>
      </Component>
    );
  }
}

MyVisCard.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.string.isRequired,
    to: PropTypes.string,
    onClick: PropTypes.func
  }).isRequired
};

export default MyVisCard;
