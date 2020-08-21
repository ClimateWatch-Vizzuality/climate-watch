import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/modal/modal-component';
import ModalHeader from 'components/modal/modal-header-component';
import TextInput from 'components/text-input';
import Dropdown from 'components/dropdown';
import Button from 'components/button';
import CheckInput from 'components/check-input';

import theme from 'styles/themes/input/text-input-theme.scss';
import styles from './modal-download-styles.scss';

class ModalDownload extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      organization: '',
      sector: {},
      country: {},
      explanation: '',
      subscription: false,
      testUser: false
    };
  }

  handleChange = (event, name) => {
    this.setState({ [name]: event.target.value });
  };

  updateCheckValue = (event, name) => {
    this.setState({ [name]: event.target.checked });
  };

  updateDropdownValue = (valueObject, dropdownId) => {
    this.setState({ [dropdownId]: valueObject });
  };

  renderForm() {
    const { countries, sectors, downloadSize, requiredError } = this.props;

    const onSubmit = event => {
      event.preventDefault();
      this.props.onSubmit(this.state);
    };

    return (
      <div>
        <p className={styles.introText}>
          Climate Watch has an open data commitment and intends to provide
          information free of constraints and restrictions on use. However, to
          help improve Climate Watch we request that you provide some feedback
          about how you intend to use the data.
        </p>

        <form className={styles.form}>
          <TextInput
            className={styles.input}
            theme={theme}
            label="First name"
            value={this.state.firstName}
            inputType="text"
            onChange={e => this.handleChange(e, 'firstName')}
            required={requiredError}
          />

          <TextInput
            className={styles.input}
            theme={theme}
            label="Last name"
            value={this.state.lastName}
            inputType="text"
            onChange={e => this.handleChange(e, 'lastName')}
            required={requiredError}
          />
          <div>
            <TextInput
              className={styles.input}
              theme={theme}
              inputType="email"
              label="Email"
              value={this.state.email}
              onChange={e => this.handleChange(e, 'email')}
              required={requiredError}
            />
            <CheckInput
              className={styles.checkbox}
              checked={this.state.subscription}
              label="Subscribe to email updates"
              onChange={e => this.updateCheckValue(e, 'subscription')}
              toggleFirst
              disabled={!this.state.email && true}
              id="subscription"
              errorText="Please enter a valid email to subscribe"
            />
          </div>

          <Dropdown
            className={styles.dropdown}
            label="Country"
            options={countries}
            onValueChange={selected =>
              this.updateDropdownValue(selected, 'country')
            }
            value={this.state.country}
            hideResetButton
            required={requiredError}
          />

          <TextInput
            className={styles.input}
            theme={theme}
            inputType="text"
            label="Organization"
            value={this.state.organization}
            onChange={e => this.handleChange(e, 'organization')}
            required={requiredError}
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
            required={requiredError}
          />

          <TextInput
            className={styles.input}
            theme={theme}
            inputType="textarea"
            label="How do you intend to use the data?"
            value={this.state.explanation}
            onChange={e => this.handleChange(e, 'explanation')}
            required={requiredError}
          />

          <CheckInput
            checked={this.state.testUser}
            label="Do you want to test new developments of Climate Watch platform?"
            onChange={e => this.updateCheckValue(e, 'testUser')}
            toggleFirst
            disabled={!this.state.email && true}
            id="testUser"
            errorText="Please enter a valid email to optin"
          />
        </form>
        <Button
          type="submit"
          onClick={onSubmit}
          variant="primary"
          className={styles.downloadButton}
        >
          {`Download ${downloadSize ? `(${downloadSize})` : ''}`}
        </Button>
        <p className={styles.licenseAndPolicy}>
          These data carry the{' '}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Creative Commons CC BY 4.0
          </a>{' '}
          license.
        </p>
        <p className={styles.licenseAndPolicy}>
          By clicking Download you agree to our{' '}
          <a
            href="http://www.wri.org/about/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Data privacy policy.
          </a>
        </p>
      </div>
    );
  }

  render() {
    const { isOpen, onRequestClose } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        header={<ModalHeader title="Data Download" />}
      >
        {this.renderForm()}
      </Modal>
    );
  }
}

ModalDownload.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  downloadSize: PropTypes.string,
  onRequestClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  countries: PropTypes.array.isRequired,
  sectors: PropTypes.array.isRequired,
  requiredError: PropTypes.bool
};

export default ModalDownload;
