import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/modal/modal-component';
import ModalHeader from 'components/modal/modal-header-component';
import TextInput from 'components/text-input';
import TextArea from 'components/text-area';
import Dropdown from 'components/dropdown';

import theme from 'styles/themes/input/text-input-theme.scss';
import styles from './modal-download-styles.scss';

class ModalDownload extends PureComponent {
  renderForm() {
    const {
      countries,
      sectors,
      isSubmitting,
      downloadSize,
      onSubmit,
      updateFirstName,
      updateLastName,
      updateEmail,
      updateCountry,
      updateOrganization,
      updateSector,
      updateExplanation,
      firstName,
      lastName,
      email,
      country,
      organization,
      sector,
      explanation
    } = this.props;

    return (
      <div>
        <p>
          Climate Watch has an open data commitment and intends to provide
          information free of constraints and restrictions on use. However, to
          help improve Climate Watch we request that you provide some feedback
          about how you intend to use the data.
        </p>

        <form onSubmit={onSubmit}>
          <TextInput
            className={styles.input}
            theme={theme}
            label={'First name'}
            inputType={'text'}
            onChange={updateFirstName}
            value={firstName}
            required
          />

          <TextInput
            className={styles.input}
            theme={theme}
            label={'Last name'}
            inputType={'text'}
            onChange={updateLastName}
            required
          />

          <TextInput
            className={styles.input}
            theme={theme}
            inputType={'email'}
            label={'Email'}
            onChange={updateEmail}
            required
          />

          <Dropdown
            className={styles.dropdown}
            label="Country"
            options={countries}
            onValueChange={updateCountry}
            hideResetButton
            required
          />

          <label>
            Subscribe to email updates
            <input
              name="subscribe"
              type="checkbox"
              value="true"
              ref={el => (this.subscribeInput = el)}
            />
          </label>

          <TextInput
            className={styles.input}
            theme={theme}
            inputType={'text'}
            label={'Organization'}
            onChange={updateOrganization}
          />

          <Dropdown
            className={styles.dropdown}
            label="Sector"
            options={sectors}
            onValueChange={updateSector}
            hideResetButton
          />

          <TextInput
            className={styles.input}
            theme={theme}
            inputType="textarea"
            label="How do you intend to use the data?"
            onDescriptionChange={updateExplanation}
            onFocus={updateExplanation}
          />

          <input
            type="submit"
            value={`Download ${downloadSize}`}
            disabled={isSubmitting}
          />

          <p>
            These data carry the Creative Commons CC BY 4.0 license. By clicking
            Download you agree to our Data privacy policy.
          </p>
        </form>
      </div>
    );
  }

  render() {
    const { isOpen, onRequestClose } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        header={<ModalHeader title="Download NDC Component" />}
      >
        {this.renderForm()}
      </Modal>
    );
  }
}

ModalDownload.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  downloadUrl: PropTypes.string.isRequired,
  downloadSize: PropTypes.string.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  countries: PropTypes.array.isRequired,
  sectors: PropTypes.array.isRequired,
  updateFirstName: PropTypes.func.isRequired,
  updateLastName: PropTypes.func.isRequired,
  updateEmail: PropTypes.func.isRequired,
  updateCountry: PropTypes.func.isRequired,
  updateOrganization: PropTypes.func.isRequired,
  updateSector: PropTypes.func.isRequired,
  updateExplanation: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  organization: PropTypes.string.isRequired,
  sector: PropTypes.string.isRequired,
  explanation: PropTypes.string.isRequired
};

export default ModalDownload;
