import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import isEmpty from 'lodash/isEmpty';

import Icon from 'components/icon';

import styles from './sdg-card-styles.scss';

class SDGCard extends PureComponent {
  render() {
    const {
      sdgData,
      indicators,
      square,
      tooltipId,
      setTooltipData,
      className,
      activeSector,
      icons,
      targetsMeta,
      hover,
      onClick
    } = this.props;
    const cardStyle = cx(
      styles.card,
      {
        [styles.square]: square,
        [styles.cardHover]: hover,
        [styles[`hover${sdgData.number}`]]: hover
      },
      className
    );

    if (!sdgData || !sdgData.number) {
      return <div key={Math.random()} className={cardStyle} />;
    }

    const hasTargets = !isEmpty(targetsMeta) && sdgData && sdgData.targets;
    const title = square ? sdgData.title : `${sdgData.number} ${sdgData.title}`;
    return (
      <div className={cardStyle} onClick={onClick} role="menuitem" tabIndex={0}>
        <h4 className={styles.title}>{title}</h4>
        <div className={styles.dots}>
          {hasTargets &&
            sdgData.targets.map(target => {
              const sectors =
                targetsMeta[target.targetKey] &&
                targetsMeta[target.targetKey].sectors;
              const isSmall =
                activeSector &&
                sectors &&
                sectors.indexOf(parseInt(activeSector.value, 10)) === -1;
              return (
                <span
                  key={target.targetKey}
                  data-for={tooltipId}
                  data-tip
                  onMouseEnter={() => setTooltipData(target)}
                  className={cx(styles.dot, { [styles.small]: isSmall })}
                  style={{
                    backgroundColor: target.sectors ? sdgData.colour : ''
                  }}
                />
              );
            })}
        </div>
        {(!indicators || square) && (
          <div className={styles.number}>{sdgData.number}</div>
        )}
        {sdgData.id && (
          <Icon
            icon={icons[`sdg${sdgData.number}`]}
            className={cx(styles.icon, styles[`icon${sdgData.number}`])}
          />
        )}
      </div>
    );
  }
}

SDGCard.propTypes = {
  icons: PropTypes.object.isRequired,
  sdgData: PropTypes.object,
  hover: PropTypes.bool,
  indicators: PropTypes.bool,
  square: PropTypes.bool,
  tooltipId: PropTypes.string,
  setTooltipData: PropTypes.func,
  className: PropTypes.string,
  activeSector: PropTypes.object,
  targetsMeta: PropTypes.object,
  onClick: PropTypes.func.isRequired
};

SDGCard.defaultProps = {
  square: false,
  hover: false
};

export default SDGCard;
