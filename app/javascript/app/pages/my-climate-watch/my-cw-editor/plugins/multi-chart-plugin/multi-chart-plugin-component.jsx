import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import RenderChart from 'components/my-climate-watch/viz-creator/components/render-chart';
import styles from './multi-chart-plugin-styles';

class MultiChartPlugin extends PureComponent {
  render() {
    const { blockProps } = this.props;
    console.log(this.props);
    return (
      <div
        style={{ pointerEvents: 'none' }}
        className={cx(styles.container, { [styles.containerFocussed]: blockProps.isFocused })}
      >
        <RenderChart {...blockProps} />
      </div>
    );
  }
}

MultiChartPlugin.propTypes = {
  blockProps: PropTypes.object
};

export default MultiChartPlugin;
