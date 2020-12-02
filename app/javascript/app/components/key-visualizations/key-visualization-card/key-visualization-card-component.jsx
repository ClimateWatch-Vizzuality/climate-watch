import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import cx from 'classnames';
import Icon from 'components/icon';
import checkIcon from 'assets/icons/check.svg';
import styles from './key-visualization-card-styles.scss';

class KeyVisualizationCard extends PureComponent {
  render() {
    const { visualization, selected, onCardClick } = this.props;

    const currentSelected = selected && selected.id === visualization.id;
    const selectedClass = currentSelected ? styles.cardSelected : '';
    const formattedDate = moment(visualization.created_date).format(
      'MMMM YYYY'
    );

    return (
      <div
        tabIndex="-1"
        role="button"
        className={cx(styles.keyVisualizationCard, selectedClass)}
        onClick={() => onCardClick(visualization, currentSelected)}
      >
        <div className={styles.cardPreview}>
          <img
            src={visualization.preview_image_url}
            alt={visualization.title}
          />
        </div>
        <div className={styles.cardCheck}>
          <Icon icon={checkIcon} />
        </div>
        <div className={styles.cardInfo}>
          <div className={styles.cardInfoDate}>{formattedDate}</div>
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
