import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/modal/modal-component';
import ModalHeader from 'components/modal/modal-header-component';
import TextInput from 'components/text-input';
import Dropdown from 'components/dropdown';

import theme from 'styles/themes/input/text-input-theme.scss';
import styles from './modal-download-styles.scss';

class ModalDownload extends PureComponent {
  renderForm() {
    const { countries, sectors, isSubmitting, downloadSize } = this.props;

    const onBlur = () => {};

    const onSubmit = event => {
      event.preventDefault();

      this.props.onSubmit({
        first_name: this.firstNameInput.state.value,
        last_name: this.lastNameInput.state.value,
        email: this.emailInput.state.value,
        subscribe: this.subscribeInput.checked,
        organization: this.organizationInput.state.value,
        sector:
          this.sectorInput.selectorElement.state.value &&
          this.sectorInput.selectorElement.state.value.value,
        country:
          this.countryInput.selectorElement.state.value &&
          this.countryInput.selectorElement.state.value.value,
        explanation: this.explanationInput.state.value
      });
    };

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
            inputType="text"
            onBlur={onBlur}
            innerRef={el => (this.firstNameInput = el)}
            required
          />

          <TextInput
            className={styles.input}
            theme={theme}
            label={'Last name'}
            inputType="text"
            onBlur={onBlur}
            innerRef={el => (this.lastNameInput = el)}
            required
          />

          <TextInput
            className={styles.input}
            theme={theme}
            inputType="email"
            label={'Email'}
            onBlur={onBlur}
            innerRef={el => (this.emailInput = el)}
            required
          />

          <Dropdown
            className={styles.dropdown}
            label="Country"
            options={countries}
            onBlur={onBlur}
            innerRef={el => (this.countryInput = el)}
            hideResetButton
            required
          />

          <label>
            Subscribe to email updates
            <input
              ref={el => (this.subscribeInput = el)}
              name="subscribe"
              type="checkbox"
              value="true"
            />
          </label>

          <TextInput
            className={styles.input}
            theme={theme}
            inputType="text"
            label={'Organization'}
            innerRef={el => (this.organizationInput = el)}
            onBlur={onBlur}
          />

          <Dropdown
            className={styles.dropdown}
            label="Sector"
            options={sectors}
            onBlur={onBlur}
            innerRef={el => (this.sectorInput = el)}
            hideResetButton
          />

          <TextInput
            className={styles.input}
            theme={theme}
            inputType="textarea"
            onBlur={onBlur}
            innerRef={el => (this.explanationInput = el)}
            label={'How do you intend to use the data?'}
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
  downloadSize: PropTypes.string.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  countries: PropTypes.array.isRequired,
  sectors: PropTypes.array.isRequired
};

export default ModalDownload;
