import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import styles from './my-cw-insight-card-styles.scss';

class MyInsightCard extends PureComponent {
  render() {
    const { data, className, link } = this.props;
    return (
      <Link to={link} className={cx(styles.card, className)}>
        <img className={styles.cardImage} src={data.img} alt={data.title} />
        <h2 className={styles.cardTitle}>{data.title}</h2>
        <p
          className={styles.cardContent}
          dangerouslySetInnerHTML={{ __html: data.content }} // eslint-disable-line
        />
      </Link>
    );
  }
}

MyInsightCard.propTypes = {
  className: PropTypes.string,
  link: PropTypes.string.isRequired,
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }).isRequired
};

export default MyInsightCard;
