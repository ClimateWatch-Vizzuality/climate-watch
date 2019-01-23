import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'cw-components';
import NdcsMap from './ndcs-map';
import NdcsTable from './ndcs-table';
import styles from './countries-actions-styles';

const tabs = [
  {
    name: 'MAP',
    value: 'map',
    disabled: false
  },
  {
    name: 'TABLE',
    value: 'table',
    disabled: false
  }
];

const SwitchOptions = {
  map: NdcsMap,
  table: NdcsTable
};

class CountriesActions extends PureComponent {
  render() {
    const {
      handleSwitchClick,
      query,
      countriesCountWithProposedActions
    } = this.props;
    const switchOption = query.display || 'map';

    const Component = SwitchOptions[switchOption];

    return (
      <React.Fragment>
        <div className={styles.page}>
          <h3 className={styles.title}>Countries’ Actions in their NDCs</h3>
          <div className={styles.descriptionWrapper}>
            <span className={styles.description}>
              As part of the Paris Agreement, ({countriesCountWithProposedActions})
              countries have proposed agricultural mitigation and adaptation
              actions. See what countries are saying about agriculture in their
              NDCs.
            </span>
            <Switch
              options={tabs}
              selectedOption={tabs.find(o => o.value === switchOption).value}
              onClick={handleSwitchClick}
              theme={{
                wrapper: styles.switch,
                option: styles.switchOption,
                checkedOption: styles.switchSelected
              }}
            />
          </div>
          <Component />
        </div>
      </React.Fragment>
    );
  }
}

CountriesActions.propTypes = {
  handleSwitchClick: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  countriesCountWithProposedActions: PropTypes.number
};

export default CountriesActions;
