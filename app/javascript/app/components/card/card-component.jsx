import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './card-styles.scss';

class Card extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { title, children } = this.props;
    return (
      <div className={styles.card}>
        <div className={styles.data}>{children}</div>
        <div className={styles.info}>{title}</div>
      </div>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
};

export default Card;
