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
      targetsMeta
    } = this.props;
    const cardStyle = cx(styles.card, square ? styles.square : null, className);
    const hasTargets = !isEmpty(targetsMeta) && sdgData && sdgData.targets;
    return (
      <div className={cardStyle}>
        <h4 className={styles.title}>{`${indicators
          ? sdgData.id
          : ''} ${sdgData.title}`}</h4>
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
        {!indicators && <div className={styles.number}>{sdgData.id}</div>}
        <Icon icon={icons[`sdg${sdgData.id}`]} className={styles.icon} />
      </div>
    );
  }
}

SDGCard.propTypes = {
  icons: PropTypes.object.isRequired,
  sdgData: PropTypes.object,
  indicators: PropTypes.bool,
  square: PropTypes.bool,
  tooltipId: PropTypes.string,
  setTooltipData: PropTypes.func,
  className: PropTypes.string,
  activeSector: PropTypes.object,
  targetsMeta: PropTypes.object
};

export default SDGCard;
