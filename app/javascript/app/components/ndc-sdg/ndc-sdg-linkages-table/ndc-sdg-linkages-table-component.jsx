import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { isPageContained } from 'utils/navigation';

import SDGCard from 'components/sdg-card';
import NdcSdgLinkagesList from 'components/ndc-sdg/ndc-sdg-linkages-list';
import Loading from 'components/loading';

import cardTheme from 'styles/themes/sdg-card/sdg-card';
import styles from './ndc-sdg-linkages-table-styles.scss';

class NdcSdgLinkagesTable extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      goals,
      selectedGoal,
      goalHover,
      onGoalHover,
      targetHover,
      onTargetHover,
      handleClickGoal,
      handleClickClose
    } = this.props;

    if (!goals || !goals.length) return <Loading className={styles.loading} />;
    return (
      <div
        className={cx('grid-column-item', {
          [styles.isContained]: isPageContained
        })}
      >
        {selectedGoal ? (
          <NdcSdgLinkagesList
            targetHover={targetHover}
            onTargetHover={onTargetHover}
            onCloseClick={handleClickClose}
            goal={selectedGoal}
          />
        ) : (
          <div className={styles.container}>
            {goals.map((goal, i) => {
              let isSelected = false;
              if (goalHover) {
                isSelected = goal.id === goalHover;
              } else {
                isSelected = selectedGoal
                  ? goal.id === selectedGoal.id
                  : i === 0;
              }

              return (
                <SDGCard
                  square
                  hover
                  selected={isSelected}
                  onMouseEnter={() => onGoalHover(goal.number)}
                  onClick={() => handleClickGoal(goal.number)}
                  key={goal.title}
                  goal={goal}
                  tooltipId="sdg-linkages"
                  className={cx(cardTheme.card, cardTheme.squaredCard)}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

NdcSdgLinkagesTable.propTypes = {
  goals: PropTypes.array,
  handleClickGoal: PropTypes.func.isRequired,
  handleClickClose: PropTypes.func.isRequired,
  selectedGoal: PropTypes.object,
  targetHover: PropTypes.string,
  goalHover: PropTypes.number,
  onGoalHover: PropTypes.func.isRequired,
  onTargetHover: PropTypes.func.isRequired
};

export default NdcSdgLinkagesTable;
