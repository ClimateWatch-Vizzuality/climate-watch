import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import RenderChart from 'components/my-climate-watch/viz-creator/components/render-chart';
import styles from './multi-chart-plugin-styles';

class MultiChartPlugin extends PureComponent {
  render() {
    const { blockProps } = this.props;
    const { isFocused, deleteAtomic, title, description, editViz } = blockProps;
    return (
      <div
        className={cx(styles.container, {
          [styles.containerFocussed]: isFocused
        })}
      >
        <h1 className={styles.title}>{title}</h1>
        <RenderChart {...blockProps} />
        <p className={styles.description}>{description}</p>
        <ul className={styles.tools}>
          <li>
            <button
              className={cx(styles.tool, styles.edit)}
              onClick={() => editViz(this.props)}
            >
              X
            </button>
          </li>
          <li>
            <button
              className={cx(styles.tool, styles.delete)}
              onClick={() => deleteAtomic(this.props)}
            >
              X
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

MultiChartPlugin.propTypes = {
  blockProps: PropTypes.object,
  isFocused: PropTypes.bool,
  deleteAtomic: PropTypes.func
};

export default MultiChartPlugin;
