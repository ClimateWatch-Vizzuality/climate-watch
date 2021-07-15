import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from 'components/icon';
import Dot from './dot';

import styles from './sdg-card-styles.scss';

class SDGCard extends PureComponent {
  render() {
    const {
      selected,
      goal,
      targets,
      indicators,
      square,
      className,
      icons,
      hover,
      onClick,
      onMouseEnter,
      targetData,
      tooltipId,
      setTooltipData,
      iso,
      activeSector
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
        onClick={onClick}
        role="menuitem"
        tabIndex={0}
        onMouseEnter={onMouseEnter}
        data-tour-action={goal.number === 1 && 'ndcs-sdg-03'}
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
                activeSector={activeSector}
                goal={goal}
              />
            ))}
        </div>
        {(!indicators || square) && (
          <div className={styles.number}>{goal.number}</div>
        )}
        {goal.id && (
          <Icon
            icon={icons[`sdg${goal.number}`]}
            className={cx(styles.icon, styles[`icon${goal.number}`])}
          />
        )}
      </div>
    );
  }
}

SDGCard.propTypes = {
  icons: PropTypes.object.isRequired,
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
  activeSector: PropTypes.object,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func
};

SDGCard.defaultProps = {
  square: false,
  hover: false,
  onClick: () => {},
  onMouseEnter: () => {}
};

export default SDGCard;
