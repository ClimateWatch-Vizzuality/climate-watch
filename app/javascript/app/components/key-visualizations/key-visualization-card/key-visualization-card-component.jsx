import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './key-visualization-card-styles.scss';

class KeyVisualizationCard extends PureComponent {
  render() {
    const { visualization, selected, onCardClick } = this.props;

    const currentSelected = selected && selected.id === visualization.id;
    const selectedClass = currentSelected ? styles.cardSelected : '';

    return (
      <div
        tabIndex="-1"
        role="button"
        className={cx(styles.keyVisualizationCard, selectedClass)}
        onClick={() => onCardClick(visualization, currentSelected)}
      >
        <div className={styles.cardPreview}>&nbsp;</div>
        <div className={styles.cardInfo}>
          <div className={styles.cardInfoDate}>March 2019</div>
          <div className={styles.cardInfoTitle}>{visualization.title}</div>
        </div>
      </div>
    );
  }
}

KeyVisualizationCard.propTypes = {
  visualization: PropTypes.object.isRequired,
  selected: PropTypes.object,
  onCardClick: PropTypes.func.isRequired
};

export default KeyVisualizationCard;
