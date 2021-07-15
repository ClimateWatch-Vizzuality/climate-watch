import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import AbbrReplace from 'components/abbr-replace';
import cx from 'classnames';
import { handleAnalytics } from 'utils/analytics';
import closeIcon from 'assets/icons/legend-close.svg';
import styles from './ndc-sdg-linkages-list-styles.scss';

class NdcSdgLinkagesList extends PureComponent {
  handleClick = target => {
    const { onTargetHover, targetHover } = this.props;
    const isSelected = targetHover === target;
    if (isSelected) {
      onTargetHover(null);
    } else {
      onTargetHover(target);
    }
    handleAnalytics('NDC-SDG map', 'Target being visualised', target);
  };

  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { goal, onCloseClick, targetHover, targets } = this.props;
    const headerStyle = { borderColor: goal.colour };
    return (
      <div className={styles.container}>
        <div className={styles.header} style={headerStyle}>
          <div className={styles.titleContainer}>
            <span className={styles.number}>{goal.number}</span>
            <span className={styles.title}>{goal.title}</span>
          </div>
          <button
            className={styles.closeButton}
            onClick={onCloseClick}
            data-tour-action="ndcs-sdg-01"
          >
            <Icon icon={closeIcon} className={styles.icon} />
          </button>
        </div>
        <div className={styles.targetContainer}>
          {targets.map((target, index) => {
            const isSelected = targetHover === target.number;
            const style = {
              borderBottom: `4px solid ${
                isSelected ? goal.colour : 'transparent'
              }`
            };
            return (
              <div
                key={target.id}
                className={cx(styles.target, {
                  [styles.targetSelected]: isSelected
                })}
                style={style}
                role="button"
                tabIndex={index}
                onClick={() => this.handleClick(target.number)}
              >
                <span className={styles.number}>{target.number}</span>
                <AbbrReplace>
                  <span className={styles.title}>{target.title}</span>
                </AbbrReplace>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

NdcSdgLinkagesList.propTypes = {
  goal: PropTypes.object.isRequired,
  targets: PropTypes.array.isRequired,
  targetHover: PropTypes.string,
  onCloseClick: PropTypes.func.isRequired,
  onTargetHover: PropTypes.func.isRequired
};

export default NdcSdgLinkagesList;
