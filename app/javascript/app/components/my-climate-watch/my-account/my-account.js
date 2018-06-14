import { connect } from 'react-redux';
import * as actions from 'providers/login-provider/login-provider-actions';
import { USERS_PROFESIONAL_SECTORS as sectors } from 'data/constants';
import Component from './my-account-component';

import {
  countriesSelector,
  sectorsSelector,
  userSectorSelector,
  userCountrySelector
} from './my-account-selectors';

const mapStateToProps = ({ login, countries }) => {
  const myAccountState = {
    countries,
    sectors,
    userSector: login.user.user_id.sector,
    userCountry: login.user.user_id.country
  };

  return {
    isProfileUpdated: login.profileUpdated,
    updateError: login.profileUpdateError,
    email: login.user.email,
    id: login.user.user_id.id,
    tester: login.user.user_id.tester,
    dataUsage: login.user.user_id.data_usage,
    firstName: login.user.user_id.first_name,
    lastName: login.user.user_id.last_name,
    organization: login.user.user_id.organization,
    sector: userSectorSelector(myAccountState),
    country: userCountrySelector(myAccountState),
    countries: countriesSelector(myAccountState),
    sectors: sectorsSelector(myAccountState)
  };
};

export default connect(mapStateToProps, actions)(Component);
