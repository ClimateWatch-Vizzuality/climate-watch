import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';

import styles from './sdg-card-styles.scss';

class SDGCard extends PureComponent {
  render() {
    const { sdg } = this.props;
    return (
      <div className={styles.card}>
        <h4 className={styles.title}>{`${sdg.index}. ${sdg.title}`}</h4>
        {sdg.sections.map(section => (
          <span key={section.number} className={styles.dot} />
        ))}
      </div>
    );
  }
}

SDGCard.propTypes = {
  sdg: Proptypes.object
};

export default SDGCard;
