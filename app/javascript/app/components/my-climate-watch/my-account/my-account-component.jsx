import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginProvider from 'providers/login-provider';
import TextInput from 'components/text-input';
import CheckInput from 'components/check-input';
import Dropdown from 'components/dropdown';
import Button from 'components/button';

import theme from 'styles/themes/input/text-input-theme.scss';
import styles from './my-account-styles.scss';

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: props.firstName || '',
      lastName: props.lastName || '',
      email: props.email || '',
      organization: props.organization || '',
      sector: props.sector || {},
      country: props.country || {},
      dataUsage: props.dataUsage || '',
      tester: props.tester || true
    };
  }

  handleChange = (event, input) => {
    this.setState({ [input]: event.target.value });
  };

  updateDropdownValue = (valueObject, dropdownId) => {
    this.setState({ [dropdownId]: valueObject });
  };

  updateCheckValue = (event, input) => {
    this.setState({ [input]: event.target.checked });
  };

  render() {
    const {
      countries,
      sectors,
      isProfileUpdated,
      updateError,
      saveUserData
    } = this.props;

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
            value={this.state.firstName}
            onChange={e => this.handleChange(e, 'firstName')}
          />
          <TextInput
            className={styles.input}
            theme={theme}
            placeholder={'Add a name'}
            label={'Last name'}
            inputType={'text'}
            value={this.state.lastName}
            onChange={e => this.handleChange(e, 'lastName')}
          />
          <TextInput
            className={styles.input}
            theme={theme}
            value={this.state.email}
            inputType={'text'}
            label={'Email'}
            disabled
          />
        </div>
        <div className={styles.organizationalInfo}>
          <TextInput
            className={styles.input}
            theme={theme}
            placeholder={'Add an organization'}
            label={'Organization'}
            inputType={'text'}
            focus
            value={this.state.organization}
            onChange={e => this.handleChange(e, 'organization')}
          />
          <Dropdown
            className={styles.dropdown}
            label="Sector"
            options={sectors}
            onValueChange={selected =>
              this.updateDropdownValue(selected, 'sector')
            }
            value={this.state.sector}
            hideResetButton
          />
          <Dropdown
            className={styles.dropdown}
            label="Country"
            options={countries}
            value={this.state.country}
            onValueChange={selected =>
              this.updateDropdownValue(selected, 'country')
            }
            hideResetButton
          />
        </div>
        <div className={styles.dataUsageInfo}>
          <TextInput
            className={styles.textarea}
            theme={theme}
            label={'How do you intend to use the data?'}
            inputType={'textarea'}
            value={this.state.dataUsage}
            onChange={e => this.handleChange(e, 'dataUsage')}
          />
        </div>
        <CheckInput
          className={styles.optIn}
          checked={this.state.tester}
          label={
            'Do you want to test new developments of Climate Watch platform?'
          }
          onChange={e => {
            this.updateCheckValue(e, 'tester');
          }}
          toggleFirst
        />
        <div className={styles.updateButton}>
          <Button variant="primary" onClick={() => saveUserData(this.state)}>
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
  }
}

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
  saveUserData: PropTypes.func.isRequired
};

export default MyAccount;
