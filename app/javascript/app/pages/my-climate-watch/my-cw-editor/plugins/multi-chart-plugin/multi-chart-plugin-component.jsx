import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Button from 'components/button';
import RenderChart from 'components/my-climate-watch/viz-creator/components/render-chart';
import Legend from 'components/my-climate-watch/viz-creator/components/charts/legend';
import Icon from 'components/icon';
import deleteIcon from 'assets/icons/delete.svg';

import styles from './multi-chart-plugin-styles';

class MultiChartPlugin extends PureComponent {
  render() {
    const { blockProps } = this.props;
    const { isFocused, deleteAtomic, title, description } = blockProps;
    return (
      <div className={styles.wrapper}>
        <div
          className={cx(styles.container, {
            [styles.containerFocussed]: isFocused
          })}
        >
          <h1 className={styles.title}>{title}</h1>
          <RenderChart {...blockProps} />
          <Legend className={styles.legend} data={blockProps.config.legend} />
          <p className={styles.description}>{description}</p>
          <ul className={styles.tools}>
            <li>
              <Button
                className={cx(styles.tool, styles.delete)}
                onClick={() => deleteAtomic(this.props)}
              >
                <Icon icon={deleteIcon} />
              </Button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

MultiChartPlugin.propTypes = {
  blockProps: PropTypes.object,
  isFocused: PropTypes.bool
};

export default MultiChartPlugin;
