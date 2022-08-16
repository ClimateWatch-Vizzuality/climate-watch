import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Dot from './dot';

import styles from './adaptation-card-styles.scss';

const AdaptationCard = props => {
  const {
    selected,
    sector,
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
  } = props;
  const { number, title: sectorTitle, cw_title } = sector;
  const cardStyle = cx(
    styles.card,
    {
      [styles.selected]: selected,
      [styles[`selected${number}`]]: selected,
      [styles.square]: square,
      [styles.cardHover]: hover,
      [styles[`hover${number}`]]: hover
    },
    className
  );
  const title = square ? sectorTitle : `${number}. ${cw_title}`;
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
              sector={sector}
            />
          ))}
      </div>
      {(!indicators || square) && <div className={styles.number}>{number}</div>}
    </div>
  );
};

AdaptationCard.propTypes = {
  sector: PropTypes.object.isRequired,
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
