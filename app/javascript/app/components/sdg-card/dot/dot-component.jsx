import { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import styles from './dot-styles.scss';

class Dot extends PureComponent {
  render() {
    const {
      target,
      goal,
      hasSectors,
      tooltipId,
      setTooltipData,
      isSmall,
      path
    } = this.props;

    let dotProps = {
      onMouseEnter: () => setTooltipData(target),
      'data-for': tooltipId,
      'data-tip': true,
      className: cx(
        styles.dot,
        { [styles.small]: isSmall },
        { [styles.clickable]: hasSectors }
      ),
      style: { backgroundColor: hasSectors ? goal.colour : '' }
    };
    if (hasSectors) dotProps = { ...dotProps, to: path };
    const reactClass = hasSectors ? Link : 'span';
    return createElement(reactClass, dotProps);
  }
}

Dot.propTypes = {
  goal: PropTypes.object.isRequired,
  target: PropTypes.object,
  hasSectors: PropTypes.bool,
  tooltipId: PropTypes.string,
  setTooltipData: PropTypes.func,
  isSmall: PropTypes.bool,
  path: PropTypes.string
};

Dot.defaultProps = {
  square: false,
  hover: false,
  onClick: () => {},
  onMouseEnter: () => {}
};

export default Dot;
