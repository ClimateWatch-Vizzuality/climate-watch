import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import Icon from 'components/icon';

import closeIcon from 'assets/icons/legend-close.svg';
import styles from './tag-styles.scss';

class Tag extends PureComponent {
  render() {
    const { data, onRemove } = this.props;
    return (
      <div className={styles.tag}>
        <span className={styles.dot} style={{ backgroundColor: data.color }} />
        <p>{data.name}</p>
        <Icon icon={closeIcon} className={styles.icon} onClick={onRemove} />
      </div>
    );
  }
}

Tag.propTypes = {
  data: Proptypes.object,
  onRemove: Proptypes.func
};

export default Tag;
