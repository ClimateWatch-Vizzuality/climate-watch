import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import SDGCard from 'components/sdg-card';
import NdcSdgLinkagesList from 'components/ndc-sdg-linkages-list';

import cardTheme from 'styles/themes/sdg-card/sdg-card';
import styles from './ndc-sdg-linkages-table-styles.scss';

class NdcSdgLinkagesTable extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { goals, selectedGoal, handleClickGoal } = this.props;
    if (!goals || !goals.length) return <div className={styles.placeholder} />;
    return (
      <div className={styles.container}>
        {selectedGoal ? (
          <NdcSdgLinkagesList goal={selectedGoal} />
        ) : (
          goals.map(goal => (
            <SDGCard
              square
              hover
              onClick={() => handleClickGoal(goal.number)}
              key={goal.title}
              sdgData={goal}
              tooltipId="sdg-linkages"
              className={cx(cardTheme.card, cardTheme.squaredCard)}
            />
          ))
        )}
      </div>
    );
  }
}

NdcSdgLinkagesTable.propTypes = {
  goals: PropTypes.array,
  handleClickGoal: PropTypes.func.isRequired,
  selectedGoal: PropTypes.object
};

export default NdcSdgLinkagesTable;
