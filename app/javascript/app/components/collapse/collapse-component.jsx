import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/button';
import Icon from 'components/icon';
import cx from 'classnames';
import filterIcon from 'assets/icons/filter.svg';
import ReactDOM from 'react-dom';
import iconWhite from 'styles/themes/icon/icon-white.scss';
import iconDefault from 'styles/themes/icon/icon-default.scss';

import styles from './collapse-styles.scss';

class Collapse extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  renderChildren() {
    const { contentRef, children, contentClassName } = this.props;
    const content = (
      <div className={cx(styles.content, contentClassName)}>{children}</div>
    );

    return contentRef ? ReactDOM.createPortal(content, contentRef) : content;
  }

  render() {
    const { handleOnClick, opened } = this.props;

    return (
      <div>
        <Button
          className={cx({ [styles.open]: opened })}
          onClick={handleOnClick}
        >
          <Icon icon={filterIcon} theme={opened ? iconWhite : iconDefault} />
          <span className={styles.buttonLabel}>Filters</span>
        </Button>
        {opened && this.renderChildren()}
      </div>
    );
  }
}

Collapse.propTypes = {
  opened: PropTypes.bool.isRequired,
  handleOnClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  contentRef: PropTypes.object,
  contentClassName: PropTypes.string
};

export default Collapse;
