import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import { themr } from 'react-css-themr';
import Icon from 'components/icon';
import cx from 'classnames';

import closeIcon from 'assets/icons/legend-close.svg';
import styles from './tag-styles.scss';

class Tag extends PureComponent {
  render() {
    const { label, color, onRemove, className, canRemove, theme } = this.props;
    return (
      <div className={cx(className, theme.tag)}>
        <span className={theme.dot} style={{ backgroundColor: color }} />
        <p className={theme.label}>{label}</p>

        {canRemove && (
          <button className={theme.closeButton} onClick={onRemove}>
            <Icon icon={closeIcon} className={theme.icon} />
          </button>
        )}
      </div>
    );
  }
}

Tag.propTypes = {
  onRemove: Proptypes.func,
  className: Proptypes.string,
  label: Proptypes.string,
  color: Proptypes.string,
  canRemove: Proptypes.bool,
  theme: Proptypes.object
};

Tag.defaultPropTypes = {
  canRemove: false
};

export default themr('Tag', styles)(Tag);
