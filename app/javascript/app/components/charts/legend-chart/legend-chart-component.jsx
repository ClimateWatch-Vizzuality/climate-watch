import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MultiSelect from 'components/multiselect';
import Icon from 'components/icon';
import Tag from 'components/tag';

import plusIcon from 'assets/icons/plus.svg';
import styles from './legend-chart-styles.scss';

class LegendChart extends PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      config,
      tagsOptions,
      tagsSelected,
      handleRemove,
      handleAdd
    } = this.props;
    return (
      <div className={styles.tags}>
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
              canRemove
            />
          ))}
        {tagsOptions &&
          tagsSelected &&
          tagsSelected.length !==
            tagsOptions.length && (
            <MultiSelect
              parentClassName={styles.tagSelector}
              values={tagsSelected || []}
              options={tagsOptions || []}
              onMultiValueChange={handleAdd}
              hideResetButton
              closeOnSelect
              dropdownDirection={-1}
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
  tagsOptions: PropTypes.array,
  tagsSelected: PropTypes.array
};

export default LegendChart;
