import React from 'react';
import PropTypes from 'prop-types';
import LoginProvider from 'providers/login-provider';
import TextInput from 'components/text-input';
import Dropdown from 'components/dropdown';
import Button from 'components/button';

import theme from 'styles/themes/input/text-input-theme.scss';
import styles from './my-account-styles.scss';

const MyAccount = props => {
  const {
    email,
    firstName,
    lastName,
    organization,
    sector,
    country,
    countries,
    sectors,
    dataUsage,
    tester,
    isProfileUpdated,
    updateError,
    updateUserFirstName,
    updateUserLastName,
    updateUserOrganization,
    updateUserSector,
    updateUserCountry,
    updateUserDataUsage,
    updateUserTester,
    saveUserData
  } = props;

  return (
    <div>
      <LoginProvider />
      <h1 className={styles.title}>User Profile</h1>
      <div className={styles.personalInfo}>
        <TextInput
          className={styles.input}
          theme={theme}
          placeholder={'Add a name'}
          label={'First name'}
          inputType={'text'}
          onBlur={updateUserFirstName}
          value={firstName}
        />
        <TextInput
          className={styles.input}
          theme={theme}
          placeholder={'Add a name'}
          label={'Last name'}
          inputType={'text'}
          onBlur={updateUserLastName}
          value={lastName}
        />
        <TextInput
          className={styles.input}
          theme={theme}
          value={email}
          inputType={'text'}
          label={'Email'}
          disabled
        />
      </div>
      <div className={styles.organizationalInfo}>
        <TextInput
          className={styles.input}
          theme={theme}
          value={organization}
          placeholder={'Add an organization'}
          label={'Organization'}
          inputType={'text'}
          focus
          onBlur={updateUserOrganization}
        />
        <Dropdown
          className={styles.dropdown}
          label="Sector"
          options={sectors}
          onValueChange={updateUserSector}
          value={sector}
          hideResetButton
        />
        <Dropdown
          className={styles.dropdown}
          label="Country"
          options={countries}
          value={country}
          onValueChange={updateUserCountry}
          hideResetButton
        />
      </div>
      <div className={styles.dataUsageInfo}>
        <TextInput
          className={styles.textarea}
          theme={theme}
          label={'How do you intend to use the data?'}
          inputType={'textarea'}
          onBlur={updateUserDataUsage}
          value={dataUsage}
        />
      </div>
      <div className={styles.optIn}>
        <input
          type="checkbox"
          onChange={e => {
            updateUserTester(e.target.checked);
          }}
          checked={tester}
        />
        <span className={styles.disclaimer}>
          Do you want to test new developments of Climate Watch platform?
        </span>
      </div>
      <div className={styles.updateButton}>
        <Button color={'yellow'} onClick={() => saveUserData()}>
          <span>Update profile</span>
        </Button>
        {isProfileUpdated && (
          <div className={styles.updateMessage}>
            Profile updated succesfully
          </div>
        )}
        {updateError && (
          <div className={styles.updateMessage}>
            There has been some error on the update
          </div>
        )}
      </div>
    </div>
  );
};

MyAccount.propTypes = {
  email: PropTypes.string.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  organization: PropTypes.string,
  sector: PropTypes.object,
  dataUsage: PropTypes.string,
  tester: PropTypes.bool,
  countries: PropTypes.array.isRequired,
  country: PropTypes.object,
  sectors: PropTypes.array.isRequired,
  isProfileUpdated: PropTypes.bool.isRequired,
  updateError: PropTypes.bool,
  updateUserFirstName: PropTypes.func.isRequired,
  updateUserLastName: PropTypes.func.isRequired,
  updateUserOrganization: PropTypes.func.isRequired,
  updateUserSector: PropTypes.func.isRequired,
  updateUserCountry: PropTypes.func.isRequired,
  updateUserDataUsage: PropTypes.func.isRequired,
  updateUserTester: PropTypes.func.isRequired,
  saveUserData: PropTypes.func.isRequired
};

export default MyAccount;
