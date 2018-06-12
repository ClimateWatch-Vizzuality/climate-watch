import React from 'react';
import PropTypes from 'prop-types';
import LoginProvider from 'providers/login-provider';
import TextInput from 'components/text-input';
import Button from 'components/button';

import theme from 'styles/themes/input/text-input-theme.scss';
import styles from './my-account-styles.scss';

const MyAccount = props => {
  const {
    email,
    name,
    organization,
    areaOfWork,
    updateUserName,
    updateUserOrganization,
    updateUserAreaOfWork,
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
          placeholder={name || 'Add a name'}
          label={'Name'}
          inputType={'text'}
          onChange={updateUserName}
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
          placeholder={organization || 'Add an organization'}
          label={'Organization'}
          inputType={'text'}
          focus
          onChange={updateUserOrganization}
        />
        <TextInput
          className={styles.input}
          theme={theme}
          placeholder={areaOfWork || 'Add an area of work'}
          label={'Area of work'}
          inputType={'text'}
          onChange={updateUserAreaOfWork}
        />
      </div>
      <div className={styles.updateButton}>
        <Button color={'yellow'} onClick={saveUserData}>
          <span>Update profile</span>
        </Button>
      </div>
    </div>
  );
};

MyAccount.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  organization: PropTypes.string.isRequired,
  areaOfWork: PropTypes.string.isRequired,
  updateUserName: PropTypes.func.isRequired,
  updateUserOrganization: PropTypes.func.isRequired,
  updateUserAreaOfWork: PropTypes.func.isRequired,
  saveUserData: PropTypes.func.isRequired
};

export default MyAccount;
