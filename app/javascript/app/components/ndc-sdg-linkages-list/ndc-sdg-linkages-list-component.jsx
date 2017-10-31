import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import cx from 'classnames';
import closeIcon from 'assets/icons/legend-close.svg';
import styles from './ndc-sdg-linkages-list-styles.scss';

class NdcSdgLinkagesList extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { goal, onCloseClick, targetHover, onTargetHover } = this.props;
    const headerStyle = { borderColor: goal.colour };
    return (
      <div className={styles.container}>
        <div className={styles.header} style={headerStyle}>
          <div className={styles.titleContainer}>
            <span className={styles.number}>{goal.number}</span>
            <span className={styles.title}>{goal.title}</span>
          </div>
          <button className={styles.closeButton} onClick={onCloseClick}>
            <Icon icon={closeIcon} className={styles.icon} />
          </button>
        </div>
        <div className={styles.targetContainer}>
          {goal.targets.map(target => (
            <div
              key={target.id}
              className={cx(styles.target, {
                [styles.targetSelected]: targetHover === target.number
              })}
              onMouseEnter={() => onTargetHover(target.number)}
            >
              <div className={styles.number}>{target.number}</div>
              <div className={styles.title}>{target.title}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

NdcSdgLinkagesList.propTypes = {
  goal: PropTypes.object.isRequired,
  targetHover: PropTypes.string,
  onCloseClick: PropTypes.func.isRequired,
  onTargetHover: PropTypes.func.isRequired
};

export default NdcSdgLinkagesList;
