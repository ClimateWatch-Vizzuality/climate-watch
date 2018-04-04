import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import Icon from 'components/icon';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import closeIcon from 'assets/icons/legend-close.svg';
import styles from './tag-styles.scss';

const handleClick = (e, data, onRemove) => {
  e.preventDefault();
  onRemove(data);
};

class Tag extends PureComponent {
  render() {
    const { data, onRemove, className, canRemove } = this.props;
    const tagContent = (
      <React.Fragment>
        <span className={styles.dot} style={{ backgroundColor: data.color }} />
        {data.title ? (
          <p
            className={styles.label}
            data-tip={`${data.title}`}
            data-for="legend-tooltip"
          >
            {data.label}
          </p>
        ) : (
          <p className={styles.label}>{data.label}</p>
        )}
        {canRemove && (
          <button
            className={styles.closeButton}
            onClick={e => handleClick(e, data, onRemove)}
          >
            <Icon icon={closeIcon} className={styles.icon} />
          </button>
        )}
      </React.Fragment>
    );
    return data.url ? (
      <div>
        <Link to={data.url} className={cx(styles.tag, className)}>
          {tagContent}
        </Link>
      </div>
    ) : (
      <li className={cx(styles.tag, className)}>{tagContent}</li>
    );
  }
}

Tag.propTypes = {
  data: Proptypes.object,
  onRemove: Proptypes.func,
  className: Proptypes.string,
  canRemove: Proptypes.bool
};

Tag.defaultPropTypes = {
  canRemove: false
};

export default Tag;
