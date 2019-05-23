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
    const { m_agriculture, a_agriculture } = countriesCountWithProposedActions;
    return (
      <React.Fragment>
        <div className={styles.page}>
          <h3 className={styles.title}>Countries’ Actions in their NDCs</h3>
          <div className={styles.descriptionWrapper}>
            <div className={styles.description}>
              <p>
                While emissions are rising, countries are also stepping up their
                commitments to reduce emissions. As part of the Paris Agreement,{' '}
                {m_agriculture} countries proposed agricultural mitigation
                measures (i.e.: targets, policies, actions and plans) and{' '}
                {a_agriculture} countries proposed agricultural adaptation
                measures (i.e.: targets, policies, actions and plans).
              </p>
              <p>
                Click on a country to see what agriculture actions have been
                proposed in their NDCs.
              </p>
            </div>
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
