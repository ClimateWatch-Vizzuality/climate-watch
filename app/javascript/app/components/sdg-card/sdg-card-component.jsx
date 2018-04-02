import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from 'components/icon';
import styles from './sdg-card-styles.scss';

class SDGCard extends PureComponent {
  render() {
    const {
      selected,
      goal,
      targets,
      targetData,
      indicators,
      square,
      tooltipId,
      setTooltipData,
      className,
      activeSector,
      icons,
      hover,
      onClick,
      onMouseEnter,
      handleOnDotClick
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
      >
        <h4 className={styles.title}>{title}</h4>
        <div className={styles.dots}>
          {targets &&
            targets.map((target, i) => {
              const isSmall =
                target.sectors &&
                activeSector &&
                target.sectors.indexOf(parseInt(activeSector.value, 10)) === -1;
              const hasSectors =
                targetData &&
                targetData.targets[target.number] &&
                targetData.targets[target.number].sectors;
              return (
                <span
                  role="link"
                  tabIndex={i}
                  onClick={
                    hasSectors &&
                    (() =>
                      handleOnDotClick(
                        target.number,
                        targetData.targets[target.number]
                      ))
                  }
                  key={target.id}
                  data-for={tooltipId}
                  data-tip
                  onMouseEnter={() => setTooltipData(target)}
                  className={cx(styles.dot, { [styles.small]: isSmall })}
                  style={{
                    backgroundColor: hasSectors ? goal.colour : ''
                  }}
                />
              );
            })}
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
  activeSector: PropTypes.object,
  onClick: PropTypes.func,
  handleOnDotClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func
};

SDGCard.defaultProps = {
  square: false,
  hover: false,
  onClick: () => {},
  onMouseEnter: () => {}
};

export default SDGCard;
