import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Dot from './dot';

import styles from './adaptation-card-styles.scss';

class AdaptationCard extends PureComponent {
  render() {
    const {
      selected,
      goal,
      targets,
      indicators,
      square,
      className,
      hover,
      onClick,
      onMouseEnter,
      targetData,
      tooltipId,
      setTooltipData,
      iso,
      activeCommitment
    } = this.props;
    const cardStyle = cx(
      styles.card,
      {
        [styles.selected]: selected,
        [styles[`selected${goal.number}`]]: selected,
        [styles.square]: square,
        [styles.cardHover]: hover,
        [styles[`hover${goal.number}`]]: hover
      },
      className
    );
    const title = square ? goal.title : `${goal.number}. ${goal.cw_title}`;
    return (
      <div
        className={cardStyle}
        role="menuitem"
        tabIndex={0}
        onMouseEnter={onMouseEnter}
      >
        <h4 className={styles.title}>{title}</h4>
        <div className={styles.dots}>
          {targets &&
            targets.map(target => (
              <Dot
                key={target.id}
                target={target}
                targetData={targetData}
                tooltipId={tooltipId}
                setTooltipData={setTooltipData}
                iso={iso}
                onClick={() => onClick(target.number)}
                activeCommitment={activeCommitment}
                goal={goal}
              />
            ))}
        </div>
        {(!indicators || square) && (
          <div className={styles.number}>{goal.number}</div>
        )}
      </div>
    );
  }
}

AdaptationCard.propTypes = {
  goal: PropTypes.object.isRequired,
  targets: PropTypes.array,
  targetData: PropTypes.object,
  selected: PropTypes.bool,
  hover: PropTypes.bool,
  indicators: PropTypes.bool,
  square: PropTypes.bool,
  tooltipId: PropTypes.string,
  setTooltipData: PropTypes.func,
  className: PropTypes.string,
  iso: PropTypes.string,
  activeCommitment: PropTypes.object,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func
};

AdaptationCard.defaultProps = {
  square: false,
  hover: false,
  onClick: () => {},
  onMouseEnter: () => {}
};

export default AdaptationCard;
