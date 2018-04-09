import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
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
        {data && data.title && tooltipId ? (
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
    return data && data.url ? (
      <li>
        <Link to={data.url} className={cx(styles.tag, className)}>
          {tagContent}
        </Link>
      </li>
    ) : (
      <li className={cx(styles.tag, className)}>{tagContent}</li>
    );
  }
}

Tag.propTypes = {
  onRemove: PropTypes.func,
  tooltipId: PropTypes.string,
  label: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  canRemove: PropTypes.bool,
  data: PropTypes.object
};

Tag.defaultPropTypes = {
  canRemove: false,
  tooltipId: '',
  data: {}
};

export default themr('Tag', styles)(Tag);
