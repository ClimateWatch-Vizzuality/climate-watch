import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AbbrReplace from 'components/abbr-replace/abbr-replace';

import styles from './map-footer-styles.scss';

class MapFooter extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { title, buckets } = this.props.data;

    return (
      <div className={styles.container}>
        <span className={styles.title}>
          <AbbrReplace>{title}</AbbrReplace>
        </span>
        <div>
          {buckets.map(value => (
            <span
              className={styles.bucket}
              style={{ backgroundColor: value }}
              key={value}
            />
          ))}
        </div>
      </div>
    );
  }
}

MapFooter.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    buckets: PropTypes.array.isRequired
  })
};

MapFooter.defaultProps = {
  data: {
    title: '',
    buckets: []
  }
};

export default MapFooter;
