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
      hasActions,
      tooltipId,
      setTooltipData,
      onClick,
      path
    } = this.props;

    const dotProps = {
      onMouseEnter: () => setTooltipData(target),
      onClick,
      'data-for': tooltipId,
      'data-tip': true,
      className: cx(styles.dot, { [styles.clickable]: hasActions }),
      style: { backgroundColor: hasActions ? goal.colour : '' },
      ...(path && { to: path })
    };
    const reactClass = path ? Link : 'span';
    return createElement(reactClass, dotProps);
  }
}

Dot.propTypes = {
  goal: PropTypes.object.isRequired,
  target: PropTypes.object,
  hasActions: PropTypes.bool,
  tooltipId: PropTypes.string,
  path: PropTypes.string,
  setTooltipData: PropTypes.func,
  onClick: PropTypes.func
};

Dot.defaultProps = {
  square: false,
  hover: false,
  onClick: () => {},
  onMouseEnter: () => {}
};

export default Dot;
