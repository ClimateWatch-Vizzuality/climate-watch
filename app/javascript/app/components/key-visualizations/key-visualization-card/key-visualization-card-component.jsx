import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './key-visualization-card-styles.scss';

class KeyVisualizationCard extends PureComponent {
  render() {
    const { visualization } = this.props;

    return (
      <div className={styles.keyVisualizationCard}>
        <div className={styles.cardPreview}>foobar</div>
        <div className={styles.cardInfo}>
          <div className={styles.cardInfoDate}>March 2019</div>
          <div className={styles.cardInfoTitle}>{visualization.title}</div>
        </div>
      </div>
    );
  }
}

KeyVisualizationCard.propTypes = {
  visualization: PropTypes.object.isRequired
};

export default KeyVisualizationCard;
