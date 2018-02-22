import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import RenderChart from 'components/my-climate-watch/viz-creator/components/render-chart';
import styles from './multi-chart-plugin-styles';

// const deleteBlock = (block) => {
//   Modifier.applyEntity({

//   })
//   SelectionState.createEmpty(block.getKey())
//     .merge({ focusOffset: block.getText().length });
// };

class MultiChartPlugin extends PureComponent {
  render() {
    const { blockProps } = this.props;
    return (
      <div
        className={cx(styles.container, {
          [styles.containerFocussed]: blockProps.isFocused
        })}
      >
        <RenderChart {...blockProps} />
        <a href="#" onClick={() => blockProps.deleteAtomic(this.props)}>
          [X]
        </a>
      </div>
    );
  }
}

MultiChartPlugin.propTypes = {
  blockProps: PropTypes.object,
  deleteAtomic: PropTypes.func,
  block: PropTypes.any,
  selection: PropTypes.any
};

export default MultiChartPlugin;
