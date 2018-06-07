import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import _map from 'lodash/map';
import _isUndefined from 'lodash/isUndefined';
import _isEmpty from 'lodash/isEmpty';
import upperFirst from 'lodash/upperFirst';
import cx from 'classnames';

import MultiSelect from 'components/multiselect';
import Dropdown from 'components/dropdown';
import Icon from 'components/icon';
import infoIcon from 'assets/icons/info.svg';
import styles from './steps-styles';

const Step3 = props => {
  const selectProps = (f, format) => {
    let value = f.selected;
    if (!value) {
      value = f.multi ? [] : {};
    }
    const disabled = _isUndefined(f.disabled) ? _isEmpty(f.data) : f.disabled;
    return {
      disabled,
      [format]: value,
      options: (f.data || []).map(d => ({
        ...d,
        label: d.label || '',
        key: `${d.label}-${Date.now()}`
      })),
      placeholder: f.placeholder || f.name,
      hidden: f.hidden,
      loading: f.loading
    };
  };

  const sortMultiselectLabels = (f, format) => {
    const labels = selectProps(f, format);
    const optionsSorted = labels.options.sort(
      (a, b) => (a.label > b.label ? 1 : -1)
    );
    return { options: optionsSorted, ...labels };
  };

  const { spec, handleFilterSelect, hasData } = props;

  return (
    <li className={styles.step}>
      <div
        className={cx(styles.stepContainer, {
          [styles.openDropdownPadding]: !hasData
        })}
      >
        <h2 className={styles.stepTitle}>3/4 - Filter the data</h2>
        <div className="layout-item-container">
          {spec && (
            <ul className={styles.selectsContainer}>
              {_map(spec, (f, i) => {
                if (!f.data) return null;
                return (
                  <li
                    key={f.name || i}
                    className={cx(styles.selectsItem, {
                      [styles.selectsItemHidden]:
                        selectProps(f, 'values').hidden ||
                        selectProps(f, 'value').hidden
                    })}
                  >
                    {f.info && (
                      <div data-tip={f.info} className={styles.infoContainer}>
                        <Icon icon={infoIcon} className={styles.infoIcon} />
                      </div>
                    )}
                    {f.multi ? (
                      <MultiSelect
                        className={styles.dropDowns}
                        {...sortMultiselectLabels(f, 'values')}
                        label={upperFirst(f.name)}
                        onMultiValueChange={e =>
                          handleFilterSelect({
                            values: e,
                            type: f.name,
                            multi: f.multi
                          })}
                      />
                    ) : (
                      <Dropdown
                        {...selectProps(f, 'value')}
                        className={styles.dropDowns}
                        label={upperFirst(f.label)}
                        onValueChange={e =>
                          handleFilterSelect({
                            ...e,
                            type: f.name
                          })}
                        hideResetButton
                      />
                    )}
                    <ReactTooltip />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </li>
  );
};

Step3.propTypes = {
  spec: PropTypes.object.isRequired,
  handleFilterSelect: PropTypes.func.isRequired,
  hasData: PropTypes.bool
};

export default Step3;
