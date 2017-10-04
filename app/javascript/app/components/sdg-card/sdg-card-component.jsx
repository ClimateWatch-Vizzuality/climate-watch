import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Icon from 'components/icon';

import sdg1 from 'assets/sdg-icons/sdg1';
import sdg2 from 'assets/sdg-icons/sdg2';
import sdg3 from 'assets/sdg-icons/sdg3';
import sdg4 from 'assets/sdg-icons/sdg4';
import sdg5 from 'assets/sdg-icons/sdg5';
import sdg6 from 'assets/sdg-icons/sdg6';
import sdg7 from 'assets/sdg-icons/sdg7';
import sdg8 from 'assets/sdg-icons/sdg8';
import sdg9 from 'assets/sdg-icons/sdg9';
import sdg10 from 'assets/sdg-icons/sdg10';
import sdg11 from 'assets/sdg-icons/sdg11';
import sdg12 from 'assets/sdg-icons/sdg12';
import sdg13 from 'assets/sdg-icons/sdg13';
import sdg14 from 'assets/sdg-icons/sdg14';
import sdg15 from 'assets/sdg-icons/sdg15';
import sdg16 from 'assets/sdg-icons/sdg16';
import sdg17 from 'assets/sdg-icons/sdg17';

import styles from './sdg-card-styles.scss';

const icons = {
  sdg1,
  sdg2,
  sdg3,
  sdg4,
  sdg5,
  sdg6,
  sdg7,
  sdg8,
  sdg9,
  sdg10,
  sdg11,
  sdg12,
  sdg13,
  sdg14,
  sdg15,
  sdg16,
  sdg17
};

class SDGCard extends PureComponent {
  render() {
    const {
      sdgData,
      indicators,
      square,
      tooltipId,
      setTooltipData,
      className,
      activeSector
    } = this.props;
    const cardStyle = cx(styles.card, square ? styles.square : null, className);
    return (
      <div className={cardStyle}>
        <h4 className={styles.title}>{`${indicators
          ? sdgData.id
          : ''} ${sdgData.title}`}</h4>
        <div className={styles.dots}>
          {indicators &&
            sdgData &&
            sdgData.targets.map(target => (
              <span
                key={target.targetKey}
                data-for={tooltipId}
                data-tip
                onMouseEnter={() => setTooltipData(target)}
                className={cx(
                  styles.dot,
                  activeSector &&
                  (!target.sectors ||
                    target.sectors.indexOf(parseInt(activeSector.value, 10)) ===
                      -1)
                    ? styles.small
                    : ''
                )}
                style={{
                  backgroundColor: target.sectors ? sdgData.colour : ''
                }}
              />
            ))}
        </div>
        {!indicators && <div className={styles.number}>{sdgData.id}</div>}
        <Icon icon={icons[`sdg${sdgData.id}`]} className={styles.icon} />
      </div>
    );
  }
}

SDGCard.propTypes = {
  sdgData: PropTypes.object,
  indicators: PropTypes.bool,
  square: PropTypes.bool,
  tooltipId: PropTypes.string,
  setTooltipData: PropTypes.func,
  className: PropTypes.string,
  activeSector: PropTypes.object
};

export default SDGCard;
