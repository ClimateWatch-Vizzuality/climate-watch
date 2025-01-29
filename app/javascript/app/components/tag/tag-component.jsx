import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import { themr } from 'react-css-themr';
import Icon from 'components/icon';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import closeIcon from 'assets/icons/legend-close.svg';
import styles from 'styles/themes/tag/base-tag.scss';

class Tag extends PureComponent {
  handleClick = e => {
    const { label, onRemove } = this.props;
    e.preventDefault();
    onRemove(label);
  };

  render() {
    const {
      data,
      theme,
      color,
      label,
      className,
      canRemove,
      tooltipId,
      children
    } = this.props;

    const tagContent = (
      <React.Fragment>
        {children}
        {!children && (
          <span className={theme.dot} style={{ backgroundColor: color }} />
        )}
        {data && data.title && tooltipId ? (
          <p className={theme.label} data-tip={data.title} data-for={tooltipId}>
            {label}
          </p>
        ) : (
          <p className={theme.label}>{label}</p>
        )}
        {canRemove && (
          <button className={theme.closeButton} onClick={this.handleClick}>
            <Icon icon={closeIcon} className={theme.icon} />
          </button>
        )}
      </React.Fragment>
    );
    return data && data.url ? (
      <div>
        <Link to={data.url} className={cx(theme.tag, className)}>
          {tagContent}
        </Link>
      </div>
    ) : (
      <li className={cx(theme.tag, className)}>{tagContent}</li>
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
  canRemove: Proptypes.bool,
  theme: Proptypes.object,
  children: Proptypes.node
};

Tag.defaultPropTypes = {
  canRemove: false,
  tooltipId: '',
  data: {}
};

export default themr('Tag', styles)(Tag);
