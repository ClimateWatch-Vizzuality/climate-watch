import React from 'react';
import ReactTooltip from 'react-tooltip';
import Progress from 'components/progress';
import AbbrReplace from 'components/abbr-replace';
import infoIcon from 'assets/icons/info.svg';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import styles from './legend-item-styles.scss';

const LegendItem = ({
  name,
  number,
  value,
  color,
  itemsName,
  hoverIndex,
  selectActiveDonutIndex,
  disableAbbr,
  infoText
}) => (
  <div
    className={styles.legendItem}
    onMouseEnter={() => selectActiveDonutIndex(hoverIndex)}
  >
    <div className={styles.legendName}>
      <span className={styles.legendDot} style={{ backgroundColor: color }} />
      <span>{disableAbbr ? name : <AbbrReplace>{name}</AbbrReplace>}</span>
      {infoText && (
        <div
          className={styles.infoContainer}
          data-for="legend-info-tooltip"
          data-tip={infoText}
        >
          <Icon icon={infoIcon} />
          <ReactTooltip id="legend-info-tooltip" effect="solid" />
        </div>
      )}
    </div>
    <div className={styles.progressContainer}>
      <Progress value={value} className={styles.progressBar} color={color} />
      <div className={styles.partiesNumber}>
        {number} {number === 1 ? itemsName[0] : itemsName[1]}
      </div>
    </div>
  </div>
);

LegendItem.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
  itemsName: PropTypes.array,
  value: PropTypes.number,
  hoverIndex: PropTypes.number.isRequired,
  color: PropTypes.string,
  selectActiveDonutIndex: PropTypes.func.isRequired,
  disableAbbr: PropTypes.bool,
  infoText: PropTypes.string
};

LegendItem.defaultProps = {
  itemsName: ['Party', 'Parties']
};

export default LegendItem;
