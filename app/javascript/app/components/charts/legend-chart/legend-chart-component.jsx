import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MultiSelect from 'components/multiselect';
import Icon from 'components/icon';
import Tag from 'components/tag';
import cx from 'classnames';

import plusIcon from 'assets/icons/plus.svg';
import styles from './legend-chart-styles.scss';

class LegendChart extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      config,
      dataOptions,
      dataSelected,
      handleRemove,
      handleAdd,
      className
    } = this.props;
    return (
      <div className={cx(styles.tags, className)}>
        {config &&
          config.columns &&
          config.columns.y.map(column => (
            <Tag
              className={styles.tag}
              key={`${column.value}`}
              data={{
                color: config.theme[column.value].stroke,
                label: column.label,
                id: column.value
              }}
              onRemove={handleRemove}
              canRemove={config.columns.y.length > 0}
            />
          ))}
        {dataOptions && (
          <MultiSelect
            parentClassName={cx(styles.tagSelector, {
              [styles.hidden]:
                !dataSelected || dataOptions.length === dataSelected.length
            })}
            values={dataSelected || []}
            options={dataOptions || []}
            onMultiValueChange={handleAdd}
            hideResetButton
            closeOnSelect
            dropdownDirection={-1}
            hideSelected
          >
            <Icon className={styles.plusIcon} icon={plusIcon} />
          </MultiSelect>
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
  className: PropTypes.string
};

export default LegendChart;
