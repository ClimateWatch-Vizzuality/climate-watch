import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import Icon from 'components/icon';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import closeIcon from 'assets/icons/legend-close.svg';
import styles from './tag-styles.scss';

class Tag extends PureComponent {
  handleClick = e => {
    const { label, onRemove } = this.props;
    e.preventDefault();
    onRemove(label);
  };

  render() {
    const { data, color, label, className, canRemove, tooltipId } = this.props;

    const tagContent = (
      <React.Fragment>
        <span className={styles.dot} style={{ backgroundColor: color }} />
        {data.title && tooltipId ? (
          <p
            className={styles.label}
            data-tip={data.title}
            data-for={tooltipId}
          >
            {label}
          </p>
        ) : (
          <p className={styles.label}>{label}</p>
        )}
        {canRemove && (
          <button className={styles.closeButton} onClick={this.handleClick}>
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
  tooltipId: Proptypes.string,
  label: Proptypes.string,
  color: Proptypes.string,
  className: Proptypes.string,
  canRemove: Proptypes.bool
};

Tag.defaultPropTypes = {
  canRemove: false,
  tooltipId: ''
};

export default Tag;
