import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import Icon from 'components/icon';
import cx from 'classnames';

import closeIcon from 'assets/icons/legend-close.svg';
import styles from './tag-styles.scss';

class Tag extends PureComponent {
  render() {
    const { data, onRemove, className } = this.props;
    return (
      <div className={cx(styles.tag, className)}>
        <span className={styles.dot} style={{ backgroundColor: data.color }} />
        <p>{data.label}</p>
        <button className={styles.closeButton} onClick={() => onRemove(data)}>
          <Icon icon={closeIcon} className={styles.icon} />
        </button>
      </div>
    );
  }
}

Tag.propTypes = {
  data: Proptypes.object,
  onRemove: Proptypes.func,
  className: Proptypes.string
};

export default Tag;
