import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MultiSelect from 'components/multiselect';
import Tag from 'components/tag';
import cx from 'classnames';
import ReactTooltip from 'react-tooltip';
import { themr } from 'react-css-themr';

import plusIcon from 'assets/icons/plus.svg';
import styles from './legend-chart-styles.scss';

class LegendChart extends PureComponent {
  componentDidUpdate() {
    ReactTooltip.rebuild();
  }

  render() {
    const {
      config,
      dataOptions,
      dataSelected,
      model,
      handleRemove,
      hideRemoveOptions,
      handleAdd,
      className,
      theme
    } = this.props;
    const shouldShowMultiselect =
      dataOptions && dataSelected && dataSelected.length !== dataOptions.length;
    const mirrorX = dataSelected && dataSelected.length < 2;
    const hasColumns = config && config.columns && config.columns.y.length;
    const hasLegendNote = config && config.legendNote;
    return (
      <div className={styles.legendChart}>
        <div className={styles.legendContainer}>
          <div className={styles.tagsContainer}>
            <div className={cx(styles.tagsWrapper, theme.tagsWrapper)}>
              <ul className={cx(styles.tags, className, theme.tags)}>
                {hasColumns &&
                  config.columns.y.map(column => (
                    <Tag
                      className={styles.tag}
                      key={`${column.value}`}
                      data={{
                        id: column.value,
                        url: column.url || null,
                        title: column.legendTooltip || null
                      }}
                      label={column.label}
                      color={config.theme[column.value].stroke}
                      tooltipId="legend-tooltip"
                      onRemove={handleRemove}
                      canRemove={
                        hideRemoveOptions ? false : config.columns.y.length > 1
                      }
                    />
                  ))}
                {hasColumns && <ReactTooltip id="legend-tooltip" />}
                {shouldShowMultiselect && (
                  <MultiSelect
                    parentClassName={styles.tagSelector}
                    values={dataSelected || []}
                    options={dataOptions || []}
                    onMultiValueChange={handleAdd}
                    hideResetButton
                    closeOnSelect
                    dropdownDirection={-1}
                    hideSelected
                    icon={plusIcon}
                    mirrorX={mirrorX}
                  />
                )}
              </ul>
            </div>
          </div>
          {hasLegendNote && (
            <div className={styles.tagDescription}>
              Click on each scenarios to see the assumptions behind it.
            </div>
          )}
        </div>
        {model && (
          <div className={styles.legendLogo}>
            <div className={styles.legendLogoTitle}>Data provided by:</div>
            <a href={model.url} target="_blank">
              <img src={`https:${model.logo}`} />
            </a>
          </div>
        )}
      </div>
    );
  }
}

LegendChart.propTypes = {
  config: PropTypes.object,
  handleRemove: PropTypes.func,
  handleAdd: PropTypes.func,
  dataOptions: PropTypes.array,
  dataSelected: PropTypes.array,
  model: PropTypes.object,
  hideRemoveOptions: PropTypes.bool,
  className: PropTypes.string,
  theme: PropTypes.object
};

export default themr('LegendChart', styles)(LegendChart);
